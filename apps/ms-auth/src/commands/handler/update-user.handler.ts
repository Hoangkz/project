import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { UserUpdatedEvent } from "libs/shared/cqrs/events/ms-auth/user-updated.event";
import { UserService } from "../../user.service";
import { UpdateUserCommand } from "../impl/update-user.command";
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand>{
    constructor(private readonly service: UserService, private readonly eventBus: EventBus){

    }
    async execute (command: UpdateUserCommand): Promise<any> {
        const user = await this.service.updateUser(command.id, command.model)
        this.eventBus.publish(new UserUpdatedEvent(user))
        return user
    }

}