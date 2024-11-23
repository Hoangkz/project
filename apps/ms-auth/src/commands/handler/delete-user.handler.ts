import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import {  UserDeletedEvent } from "libs/shared/cqrs/events/ms-auth/user-deleted.event";
import { UserService } from "../../user.service";
import { DeleteUserCommand } from "../impl/delete-user.command";


@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand>{
    constructor(private readonly service: UserService, private readonly eventBus: EventBus){

    }
    async execute(command: DeleteUserCommand): Promise<any> {
        const rs = await this.service.deleteUser(command.id)
        if(rs){
            this.eventBus.publish(new UserDeletedEvent(command.id))
        }
        return rs
    }
}