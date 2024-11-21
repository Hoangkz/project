import { User } from "libs/shared/entities/ms-auth/user.entity";

export class UserUpdatedEvent {
    constructor(public readonly user: User){

    }
}