import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'libs/shared/database/database.module';
import { Permission } from 'libs/shared/entities/ms-auth/permission.entity';
import { Role } from 'libs/shared/entities/ms-auth/role.entity';
import { UserAccessLog } from 'libs/shared/entities/ms-auth/user-access-log.entity';
import { UserResource } from 'libs/shared/entities/ms-auth/user-resource.entity';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { RmqModule } from 'libs/shared/rmq/rmq.module';
import {
  MS_AUTH,
  MS_ORGANIZATION,
  MS_SOCKET,
  MS_NOTIFICATION,
} from 'libs/shared/services';
import { commandHandlers } from './commands';
import { MsAuthController } from './ms-auth.controller';
import { queryHandlers } from './queries';
import { authSagas } from './sagas';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    DatabaseModule,
    RmqModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, JwtModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => {
        return configService.get('jwtVerifyOptions');
      },
    }),
    DatabaseModule.register(MS_AUTH),
    ...RmqModule.registerMany(
      MS_SOCKET,
      MS_ORGANIZATION,
      MS_NOTIFICATION,
    ),
    TypeOrmModule.forFeature(
      [User, Role, Permission, UserAccessLog, UserResource],
      MS_AUTH,
    ),
  ],
  controllers: [MsAuthController],
  providers: [UserService, ...commandHandlers, ...queryHandlers, ...authSagas],
  exports: [UserService],
})
export class MsAuthModule {}
