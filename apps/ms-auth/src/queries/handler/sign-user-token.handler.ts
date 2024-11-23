import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { SignUserTokenQuery } from '../impl/sign-user-token.query';

@QueryHandler(SignUserTokenQuery)
export class SignUserTokenHandler implements IQueryHandler<SignUserTokenQuery> {
  constructor(private readonly service: UserService) {}
  execute(query: SignUserTokenQuery) {
    return this.service.signToken(query.userId);
  }
}
