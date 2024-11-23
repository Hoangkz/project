import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchUserResourcesModel } from 'libs/shared/dtos/ms-auth/search-user-resources.model';
import { UserService } from '../../user.service';
import { SearchUserResourcesQuery } from '../impl/search-user-resources.query';
@QueryHandler(SearchUserResourcesQuery)
export class SearchUserResourcesHandler
  implements IQueryHandler<SearchUserResourcesQuery>
{
  constructor(public readonly service: UserService) {}

  execute(query: SearchUserResourcesQuery): Promise<any> {
    return this.service.searchUserResource(query.model);
  }
}
