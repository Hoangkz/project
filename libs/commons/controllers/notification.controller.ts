import { JwtAuthGuard } from '@libs/auth-lib/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExtraPaginationResult } from 'libs/shared/base/pagination.result';
import { MsNotificationCommand } from 'libs/shared/cqrs/commands/ms-notification.command';
import { MsNotificationQuery } from 'libs/shared/cqrs/query/ms-notification.query';
import { RequestAuthUser } from 'libs/shared/decorators/auth-user.decorator';
import { FindNotificationsModel } from 'libs/shared/dtos/ms-notification/find-notifications.model';
import { QueryNotificationResult } from 'libs/shared/dtos/ms-notification/notification.result';
import { SearchNotificationsModel } from 'libs/shared/dtos/ms-notification/search-notifications.model';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { MS_NOTIFICATION } from 'libs/shared/services';

@Controller('/notification')
@ApiTags('notification')
@UseGuards(JwtAuthGuard)
export class CommonNotificationController {
  constructor(
    @Inject(MS_NOTIFICATION) protected readonly msNotification: ClientProxy,
  ) {}

  @Post(MsNotificationQuery.SearchNotifications)
  @ApiResponse({
    type: ExtraPaginationResult<QueryNotificationResult>,
  })
  @ApiBody({
    type: SearchNotificationsModel,
    required: true,
  })
  async SearchNotifications(
    @RequestAuthUser() user: User,
    @Body() model: SearchNotificationsModel,
  ) {
    return this.msNotification.emit(MsNotificationQuery.SearchNotifications, {
      ...model,
      receiverId: user.id,
    });
  }

  @Post(MsNotificationQuery.FindNotifications)
  @ApiResponse({
    type: QueryNotificationResult,
    isArray: true,
  })
  @ApiBody({
    type: FindNotificationsModel,
    required: true,
  })
  async FindNotifications(
    @RequestAuthUser() user: User,
    @Body() model: FindNotificationsModel,
  ) {
    return this.msNotification.emit(MsNotificationQuery.FindNotifications, {
      ...model,
      receiverId: user.id,
    });
  }

  @Post(MsNotificationCommand.MarkAsReadNotification)
  @ApiQuery({
    type: String,
    required: true,
    name: 'id',
  })
  async MarkAsReadNotification(
    @RequestAuthUser() user: User,
    @Query('id') id: string,
  ) {
    return this.msNotification.emit(
      MsNotificationCommand.MarkAsReadNotification,
      { id, owner: user.id },
    );
  }

  @Post(MsNotificationCommand.MarkAsReadAllNotifications)
  async MarkAsReadAllNotifications(@Req() req: any) {
    return this.msNotification.emit(
      MsNotificationCommand.MarkAsReadAllNotifications,
      req.userId,
    );
  }

  @Post(MsNotificationCommand.MarkAsReadNotifications)
  async MarkAsReadNotifications(
    @RequestAuthUser() user: User,
    @Body() ids: string,
  ) {
    return this.msNotification.emit(
      MsNotificationCommand.MarkAsReadNotifications,
      { ids, owner: user.id },
    );
  }

  @Delete(MsNotificationCommand.DeleteNotification)
  @ApiQuery({
    type: String,
    required: true,
    name: 'id',
  })
  async delete(@RequestAuthUser() user: User, @Query('id') id: string) {
    return this.msNotification.emit(MsNotificationCommand.DeleteNotification, {
      id,
      owner: user.id,
    });
  }

  @Get(MsNotificationQuery.FindNotificationTemplates)
  async getAllNotificationTemplates() {
    return this.msNotification.emit(
      MsNotificationQuery.FindNotificationTemplates,
      {},
    );
  }
}
