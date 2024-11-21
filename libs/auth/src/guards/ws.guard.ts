import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { WsException } from '@nestjs/websockets';
import { MsAuthQuery } from 'libs/shared/cqrs/query/ms-auth.query';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { catchRpcException } from 'libs/shared/microservice/create-response';
import { MS_AUTH } from 'libs/shared/services';
import { lastValueFrom } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(MS_AUTH) private readonly msAuth: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const token = client.handshake.auth.token;
    try {
      const { sub } = this.jwtService.verify(token, {
        secret: this.configService.get('jwtSecret'),
      });
      const user = await lastValueFrom<User>(
        this.msAuth.send(MsAuthQuery.GetMe, sub).pipe(catchRpcException()),
      );
      if (!user) {
        throw new WsException('Tài khoản không tồn tại');
      }
      delete user.password;
      context.switchToHttp().getRequest().user = user;
      client.handshake.auth['user'] = user;
      return true;
    } catch (ex) {
      console.log('Kết nối không hợp lệ');
      return false;
    }
  }
}
