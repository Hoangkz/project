import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer, ValidationError } from 'class-validator';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { LogsInterceptor } from 'libs/shared/interceptors/logs.interceptor';
import { TransformRequestInterceptor } from 'libs/shared/interceptors/transform-request.interceptor';
import { AppGatewayModule } from './app-gateway.module';

export function setup(app: NestExpressApplication): NestExpressApplication {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: false,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) => {
        const detail = errors.map((error) => {
          return {
            property: error.property,
            value: error.value,
            constraints: Object.keys(error.constraints).map(
              (key) => error.constraints[key],
            ),
          };
        });
        return new UnprocessableEntityException(detail, 'Dữ liệu không hợp lệ');
      },
    }),
  );
  app.useGlobalInterceptors(
    new LogsInterceptor('app-channel'),
    new TransformRequestInterceptor(),
  );
  // app.use(express.json({ limit: '50mb' }));
  // app.use(express.urlencoded({ limit: '50mb' }));

  // app.use(cookieParser(process.env.APP_SECRET));

  // app.use(
  //   session({
  //     secret: process.env.APP_SECRET,
  //     resave: false,
  //     saveUninitialized: false,
  //     store: new session.MemoryStore(),
  //     cookie: {
  //       httpOnly: true,
  //       signed: true,
  //       sameSite: 'strict',
  //       secure: process.env.NODE_ENV === 'prod',
  //       maxAge: 2 * 60 * 60 * 1000,
  //     },
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());
  app.enableVersioning({
    prefix: '1',
    type: VersioningType.URI,
  });
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  useContainer(app.select(AppGatewayModule), { fallbackOnErrors: true });

  return app;
}
