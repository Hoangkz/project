import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { UpdatePermissionCommand } from "../impl/update-permission.command";
@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler implements ICommandHandler<UpdatePermissionCommand>{
    constructor(private readonly service: UserService){

    }
    execute (command: UpdatePermissionCommand): Promise<any> {
        return this.service.updatePermission(command.id, command.model)
    }

}