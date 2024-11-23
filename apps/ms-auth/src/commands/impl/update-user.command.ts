import { UpdateUserModel } from "libs/shared/dtos/ms-auth/update-user.model";

export class UpdateUserCommand {
    constructor(public readonly id: string, public readonly model: UpdateUserModel){

    }
}