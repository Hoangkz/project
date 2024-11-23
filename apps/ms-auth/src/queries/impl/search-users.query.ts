import { SearchUsersModel } from 'libs/shared/dtos/ms-auth/search-users.model';

export class SearchUsersQuery {
  constructor(public readonly model: SearchUsersModel) {}
}
