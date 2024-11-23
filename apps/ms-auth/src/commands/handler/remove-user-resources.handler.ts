import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { RemoveUserResourcesCommand } from "../impl/remove-user-resources.command";
@CommandHandler(RemoveUserResourcesCommand)
export class RemoveUserResourcesHandler implements ICommandHandler<RemoveUserResourcesCommand>{
    constructor(private readonly service:UserService){

    }
    execute(command: RemoveUserResourcesCommand): Promise<any> {
        return this.service.removeUserResources(command.userId, command.resourceIds)
    }
}