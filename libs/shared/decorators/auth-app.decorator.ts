import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { App } from '../entities/ms-app/app.entity';

export const RequestAuthApp = createParamDecorator(
  (propertyName: keyof App, ctx: ExecutionContext) => {
    const app = ctx.switchToHttp().getRequest<Request>().authApp;
    return propertyName ? app && app[propertyName] : app;
  },
);
