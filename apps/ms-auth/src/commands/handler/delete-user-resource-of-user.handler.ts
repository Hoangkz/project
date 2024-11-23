import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { DeleteUserResourceOfUserCommand } from "../impl/delete-user-resource-of-user.command";
@CommandHandler(DeleteUserResourceOfUserCommand)
export class DeleteUserResourceOfUserHandler implements ICommandHandler<DeleteUserResourceOfUserCommand>{
    constructor(private readonly service: UserService){}
    execute (command: DeleteUserResourceOfUserCommand): Promise<any> {
        return this.service.deleteUserResourceOfUser(command.resourceId, command.userId)
    }
}