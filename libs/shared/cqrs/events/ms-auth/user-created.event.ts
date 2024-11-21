import { User } from "libs/shared/entities/ms-auth/user.entity";

export class UserCreatedEvent{
    constructor(public readonly user: User){}
}