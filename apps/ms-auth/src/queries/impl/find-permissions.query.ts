import { FindPermissionsModel } from "libs/shared/dtos/ms-auth/find-permissions.model";

export class FindPermissionsQuery {
    constructor(public readonly model: FindPermissionsModel){}
}