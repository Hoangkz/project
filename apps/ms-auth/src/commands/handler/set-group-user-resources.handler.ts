import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { SetGroupUserResourcesCommand } from "../impl/set-group-user-resources.command";
@CommandHandler(SetGroupUserResourcesCommand)
export class SetGroupUserResourcesHandler implements ICommandHandler<SetGroupUserResourcesCommand> {
    constructor(private readonly service: UserService){}
    execute (command: SetGroupUserResourcesCommand): Promise<any> {
        return this.service.setGroupUserResources(command.id, command.model)
    }
}