import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { RemoveUserResourcesByTypeCommand } from "../impl/remove-user-resources-by-type.command";
@CommandHandler(RemoveUserResourcesByTypeCommand)
export class RemoveUserResourcesByTypeHandler implements ICommandHandler<RemoveUserResourcesByTypeCommand>{
    constructor(private readonly service:UserService){

    }

    execute(command: RemoveUserResourcesByTypeCommand): Promise<any> {
        return this.service.removeUserResourcesByType(command.userId, command.resourceType)
    }
}