import {
  Body,
  Controller,
  Get,
  Inject,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllowAuth } from 'libs/auth/src/decorators/allow-auth.decorator';
import { AllowPermissions } from 'libs/auth/src/decorators/allow-permissions.decorator';
import { UserPermissions } from 'libs/permissions/user.permissions';
import { MsAuthCommand } from 'libs/shared/cqrs/commands/ms-auth.command';
import { MsAuthQuery } from 'libs/shared/cqrs/query/ms-auth.query';
import { ApiModelBody } from 'libs/shared/decorators/api/api-model-body.decorator';
import { ApiPaginationResult } from 'libs/shared/decorators/api/api-pagination-result.decorator';
import { ApiQueryId } from 'libs/shared/decorators/api/api-query-id.decorator';
import { RequestAuthUser } from 'libs/shared/decorators/auth-user.decorator';
import { ChangeMyPasswordModel } from 'libs/shared/dtos/ms-auth/change-my-password.model';
import { ChangeUserPasswordModel } from 'libs/shared/dtos/ms-auth/change-user-password.model';
import { FindUsersModel } from 'libs/shared/dtos/ms-auth/find-users.model';
import { SearchUsersModel } from 'libs/shared/dtos/ms-auth/search-users.model';
import { UserResult } from 'libs/shared/dtos/ms-auth/user.result';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { catchRpcException } from 'libs/shared/microservice/create-response';
import { MS_AUTH } from 'libs/shared/services';

@Controller('user')
@ApiTags('user')
@AllowAuth()
export class UserController {
  constructor(@Inject(MS_AUTH) protected readonly msAuth: ClientProxy) {}

  @Get(MsAuthQuery.GetUserById)
  @ApiQueryId()
  @ApiResponse({
    type: UserResult,
  })
  async getUserById(@Query('id', ParseUUIDPipe) id: string) {
    return this.msAuth
      .send(MsAuthQuery.GetUserById, id)
      .pipe(catchRpcException());
  }

  @Post(MsAuthQuery.FindUsers)
  @ApiBody({
    required: false,
    type: () => FindUsersModel,
  })
  @ApiResponse({
    type: UserResult,
    isArray: true,
  })
  findUsers(@Body() model: FindUsersModel) {
    return this.msAuth
      .send(MsAuthQuery.FindUsers, model)
      .pipe(catchRpcException());
  }

  @Post(MsAuthQuery.SearchUsers)
  @ApiModelBody(SearchUsersModel)
  @ApiPaginationResult(UserResult)
  searchUsers(@Body() model: SearchUsersModel) {
    return this.msAuth
      .send(MsAuthQuery.SearchUsers, model)
      .pipe(catchRpcException());
  }

  @Post(MsAuthCommand.ChangeMyPassword)
  @AllowAuth()
  @ApiResponse({
    type: UserResult,
  })
  @ApiBody({
    type: ChangeMyPasswordModel,
  })
  async changeMyPassword(
    @RequestAuthUser() user: User,
    @Body() model: ChangeMyPasswordModel,
  ) {
    return this.msAuth
      .send(MsAuthCommand.ChangeMyPassword, {
        id: user.id,
        model,
      })
      .pipe(catchRpcException());
  }

  @Post(MsAuthCommand.ChangeUserPassword)
  @AllowPermissions(UserPermissions.UserManager)
  @ApiResponse({
    type: UserResult,
  })
  async changeUserPassword(
    @RequestAuthUser() user: User,
    @Body() model: ChangeUserPasswordModel,
  ) {
    return this.msAuth
      .send(MsAuthCommand.ChangeUserPassword, {
        id: user.id,
        model,
      })
      .pipe(catchRpcException());
  }
}
