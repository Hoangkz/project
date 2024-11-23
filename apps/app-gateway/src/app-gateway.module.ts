import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'libs/shared/database/database.module';
import { RmqModule } from 'libs/shared/rmq/rmq.module';

import { BullModule } from '@nestjs/bull';
import { AppGatewayController } from './app-gateway.controller';
import { AppGatewayService } from './app-gateway.service';
import { MS_AUTH, MS_SOCKET } from 'libs/shared/services';
import { AuthController } from 'libs/commons/controllers/auth.controller';
import { UserController } from 'libs/commons/controllers/user.controller';
import { AuthLibModule } from 'libs/auth/src';
@Module({
  imports: [
    RmqModule,
    AuthLibModule,
    ConfigModule,
    DatabaseModule,
    CqrsModule,
    ...RmqModule.registerMany(
      MS_AUTH,
      MS_SOCKET
    ),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        lazyConnect: false,
        offlineQueue: false,
      },
    }),
    BullModule.registerQueue(),
  ],
  controllers: [
    AppGatewayController,
    AuthController,
    UserController,
  ],
  providers: [ AppGatewayService],
})
export class AppGatewayModule {}
