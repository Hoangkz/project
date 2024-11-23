import { ChangeMyPasswordModel } from "libs/shared/dtos/ms-auth/change-my-password.model";

export class ChangeMyPasswordCommand {
    constructor(public readonly id: string, public readonly model: ChangeMyPasswordModel){}
}