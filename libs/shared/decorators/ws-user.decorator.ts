import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from '../entities/ms-auth/user.entity';

export const WsUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const user = ctx.switchToWs().getClient<Socket>().handshake.auth.user;
    return data ? user && user[data] : user;
  },
);
