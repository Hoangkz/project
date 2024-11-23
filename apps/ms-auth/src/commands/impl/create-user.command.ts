import { CreateUserModel } from "libs/shared/dtos/ms-auth/create-user.model";

export class CreateUserCommand {
    constructor(public readonly model: CreateUserModel) {

    }
}