import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { MsAuthQuery } from 'libs/shared/cqrs/query/ms-auth.query';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { catchRpcException } from 'libs/shared/microservice/create-response';
import { MS_AUTH } from 'libs/shared/services';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { lastValueFrom } from 'rxjs';

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @Inject(MS_AUTH) private readonly msAuth: ClientProxy,
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => {
          return (
            req.cookies?.Authentication ||
            req.headers['authentication'] ||
            req.headers['Authentication']
          );
        },
      ]),
      secretOrKey: configService.get<string>('jwtSecret'),
      ignoreExpiration: false,
      passReqToCallback: false,
    });

  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await lastValueFrom<User>(
      this.msAuth
        .send(MsAuthQuery.GetMe, payload.sub)
        .pipe(catchRpcException()),
    );
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }
    delete user.password;
    return user;
  }
}
