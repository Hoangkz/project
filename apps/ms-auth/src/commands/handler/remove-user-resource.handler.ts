import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { RemoveUserResourceCommand } from "../impl/remove-user-resource.command";
@CommandHandler(RemoveUserResourceCommand)
export class RemoveUserResourceHandler implements ICommandHandler<RemoveUserResourceCommand>{
    constructor(private readonly service:UserService){

    }
    execute(command: RemoveUserResourceCommand): Promise<any> {
        return this.service.removeUserResource(command.userId, command.resourceId)
    }
}