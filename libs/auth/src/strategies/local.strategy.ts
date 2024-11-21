import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { MsAuthQuery } from 'libs/shared/cqrs/query/ms-auth.query';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { catchRpcException } from 'libs/shared/microservice/create-response';

import { MS_AUTH } from 'libs/shared/services';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';

passport.serializeUser(function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(@Inject(MS_AUTH) private readonly msAuth: ClientProxy) {
    super({
      usernameField: 'loginName',
      passReqToCallback: false,
    });
  }

  validate(loginName: string, password: string): Promise<User> {
    return lastValueFrom(
      this.msAuth
        .send(MsAuthQuery.Login, { loginName, password })
        .pipe(catchRpcException()),
    );
  }
}
