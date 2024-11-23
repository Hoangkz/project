import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { AddUserResourceCommand } from "../impl/add-user-resource.command";

@CommandHandler(AddUserResourceCommand)
export class AddUserResourceHandler implements ICommandHandler<AddUserResourceCommand>{
    constructor(private readonly service:UserService){

    }
    execute(command: AddUserResourceCommand): Promise<any> {
        return this.service.addUserResource(command.id, command.model)
    }
}