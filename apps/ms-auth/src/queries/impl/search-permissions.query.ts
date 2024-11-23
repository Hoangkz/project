import { SearchPermissionsModel } from "libs/shared/dtos/ms-auth/search-permissions.model";

export class SearchPermissionsQuery {
    constructor(public readonly model: SearchPermissionsModel){}
}