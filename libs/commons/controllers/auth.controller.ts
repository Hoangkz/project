import { AllowAuth } from '@libs/auth-lib/decorators/allow-auth.decorator';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuard } from 'libs/auth/src/guards/local-auth.guard';
import { MsAuthCommand } from 'libs/shared/cqrs/commands/ms-auth.command';
import { MsSocketCommand } from 'libs/shared/cqrs/commands/ms-socket.command';
import { MsAuthQuery } from 'libs/shared/cqrs/query/ms-auth.query';
import { RequestAuthUser } from 'libs/shared/decorators/auth-user.decorator';
import { UserLoginModel } from 'libs/shared/dtos/ms-auth/user-login.model';
import { UserResult } from 'libs/shared/dtos/ms-auth/user.result';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { MS_AUTH, MS_SOCKET } from 'libs/shared/services';
import { lastValueFrom } from 'rxjs';

@Controller('/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(MS_AUTH) protected readonly msAuth: ClientProxy,
    @Inject(MS_SOCKET) protected readonly msSocket: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  //---------------User------------//

  @Post(MsAuthQuery.Login)
  @ApiBody({
    type: UserLoginModel,
  })
  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: () => UserResult,
  })
  async login(
    @RequestAuthUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await lastValueFrom(
      this.msAuth.send(MsAuthQuery.SignUserToken, user.id),
    );
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('jwtExpiration'),
    );
    response.setHeader('Authentication', token);
    response.cookie('Authentication', token, {
      httpOnly: false,
      expires,
    });
    return user;
  }

  @Get('/logout')
  @AllowAuth()
  async logout(
    @Res({ passthrough: true }) res: Response,
    @RequestAuthUser() user: User,
  ) {
    const disconnectUser = await lastValueFrom(
      this.msSocket.send(MsSocketCommand.Kich, user.id),
    );
    if (disconnectUser) {
      res.cookie('Authentication', '', {
        expires: new Date(),
      });
      return null;
    }
    throw new BadRequestException('');
  }

  @Get('/me')
  @AllowAuth()
  @ApiProperty({
    type: UserResult,
  })
  async getMe(@RequestAuthUser() user: User) {
    return user;
  }

  @Delete(MsAuthCommand.RemoveUserResource)
  @ApiQuery({
    type: String,
    required: true,
    name: 'resourceId',
  })
  removeUserResource(
    @RequestAuthUser() user: User,
    @Query('resourceId', ParseUUIDPipe) resourceId: string,
  ) {
    return this.msAuth.send(MsAuthCommand.RemoveUserResource, {
      id: user.id,
      model: resourceId,
    });
  }

  @Delete(MsAuthCommand.DeleteUserResourceOfUser)
  @ApiQuery({
    type: String,
    required: true,
    name: 'resourceId',
  })
  deleteUserResourceOfUser(
    @RequestAuthUser() user: User,
    @Query('resourceId', ParseUUIDPipe) resourceId: string,
  ) {
    return this.msAuth.send(MsAuthCommand.DeleteUserResourceOfUser, {
      resourceId,
      userId: user.id,
    });
  }
}
