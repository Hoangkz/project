import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { UpdateResourceNameCommand } from "../impl/update-user-resource-name.command";

@CommandHandler(UpdateResourceNameCommand)
export class UpdateResourceNameHandler implements ICommandHandler<UpdateResourceNameCommand>{
    constructor(private readonly service:UserService){}
    execute(command: UpdateResourceNameCommand): Promise<any> {
        return this.service.updateUserResourceName(command.model)
    }
}