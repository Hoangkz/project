import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { ClearUserResourcesCommand } from "../impl/clear-user-resources.command";
@CommandHandler(ClearUserResourcesCommand)
export class ClearUserResourcesHandler implements ICommandHandler<ClearUserResourcesCommand>{
    constructor(private readonly service:UserService){

    }

    execute(command: ClearUserResourcesCommand): Promise<any> {
        return this.service.clearUserResources(command.id)
    }
}