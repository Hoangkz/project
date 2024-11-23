import { SearchRolesModel } from "libs/shared/dtos/ms-auth/search-roles.model";

export class SearchRolesQuery {
    constructor(public readonly model: SearchRolesModel){}
}