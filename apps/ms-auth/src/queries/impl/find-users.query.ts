import { FindUsersModel } from 'libs/shared/dtos/ms-auth/find-users.model';

export class FindUsersQuery {
  constructor(public readonly model: FindUsersModel) {}
}
