import { FindRolesModel } from "libs/shared/dtos/ms-auth/find-roles.model";

export class FindRolesQuery {
    constructor(public readonly model: FindRolesModel){}
}