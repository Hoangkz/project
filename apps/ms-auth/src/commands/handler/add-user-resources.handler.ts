import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { AddUserResourcesCommand } from "../impl/add-user-resources.command";

@CommandHandler(AddUserResourcesCommand)
export class AddUserResourcesHandler implements ICommandHandler<AddUserResourcesCommand>{
    constructor(private readonly service:UserService){

    }
    execute(command: AddUserResourcesCommand): Promise<any> {
        return this.service.addUserResources(command.id, command.model)
    }
}