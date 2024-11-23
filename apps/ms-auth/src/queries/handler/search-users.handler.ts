import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { SearchUsersQuery } from '../impl/search-users.query';
@QueryHandler(SearchUsersQuery)
export class SearchUsersHandler implements IQueryHandler<SearchUsersQuery> {
  constructor(public readonly service: UserService) {}

  execute(query: SearchUsersQuery): Promise<any> {
    return this.service.searchUsers(query.model);
  }
}
