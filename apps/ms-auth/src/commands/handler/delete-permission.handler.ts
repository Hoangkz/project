import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { DeletePermissionCommand } from "../impl/delete-permission.command";

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler implements ICommandHandler<DeletePermissionCommand>{
    constructor(private readonly service: UserService){

    }
    execute(command: DeletePermissionCommand): Promise<any> {
        return this.service.deletePermission(command.id)
    }
}