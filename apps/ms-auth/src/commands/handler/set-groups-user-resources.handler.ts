import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { SetGroupsUserResourcesCommand } from "../impl/set-groups-user-resources.command";
@CommandHandler(SetGroupsUserResourcesCommand)
export class SetGroupsUserResourcesHandler implements ICommandHandler<SetGroupsUserResourcesCommand> {
    constructor(private readonly service: UserService){}
    execute (command: SetGroupsUserResourcesCommand): Promise<any> {
        return this.service.setGroupsUserResources(command.id, command.model)
    }
}