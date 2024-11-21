import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule } from 'libs/shared/rmq/rmq.module';
import {  MS_AUTH } from 'libs/shared/services';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
@Global()
@Module({
  imports: [
    RmqModule,
    ...RmqModule.registerMany( MS_AUTH),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, JwtModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwtSecret'),
          signOptions: {
            expiresIn: configService.get<number>('jwtExpiration'),
            algorithm: 'HS256',
            issuer: 'App',
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, LocalStrategy],
  exports: [],
})
export class AuthLibModule {}
