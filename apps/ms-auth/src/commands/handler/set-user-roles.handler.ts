import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { SetUserRoleCommand } from "../impl/set-user-roles.command";

@CommandHandler(SetUserRoleCommand)
export class SetUserRolesHandler implements ICommandHandler<SetUserRoleCommand>{
    constructor(private readonly service: UserService){

    }
    execute(command: SetUserRoleCommand): Promise<any> {
        return this.service.setUserRoles(command.id, command.model)
    }
}