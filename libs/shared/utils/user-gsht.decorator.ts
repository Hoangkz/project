import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserGsht } from 'apps/vms-fueldcost/src/entities/user-gsht.entity';
import { Request } from 'express';

export const AuthUserGsht = createParamDecorator(
  (data: keyof UserGsht, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<Request>()
      .user as unknown as UserGsht;
    return data ? user && user[data] : user;
  },
);
