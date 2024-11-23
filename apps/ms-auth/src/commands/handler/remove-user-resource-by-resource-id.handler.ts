import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { RemoveUserResourceByResourceIdCommand } from "../impl/remove-user-resource-by-resource-id.command";
@CommandHandler(RemoveUserResourceByResourceIdCommand)
export class RemoveUserResourceByResourceIdHandler implements ICommandHandler<RemoveUserResourceByResourceIdCommand>{
    constructor(private readonly service:UserService){

    }

    execute(command: RemoveUserResourceByResourceIdCommand): Promise<any> {
        return this.service.removeUserResourceByResourceId(command.id)
    }
}