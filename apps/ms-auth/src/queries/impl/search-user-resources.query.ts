import { SearchUserResourcesModel } from 'libs/shared/dtos/ms-auth/search-user-resources.model';

export class SearchUserResourcesQuery {
  constructor(public readonly model: SearchUserResourcesModel) {}
}
