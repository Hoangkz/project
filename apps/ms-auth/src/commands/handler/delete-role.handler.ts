import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { DeleteRoleCommand } from "../impl/delete-role.command";


@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand>{
    constructor(private readonly service: UserService){

    }
    execute(command: DeleteRoleCommand): Promise<any> {
        return this.service.deleteRole(command.id)
    }
}