import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { ChangeUserIsAdminCommand } from "../impl/change-user-is-admin.command";

@CommandHandler(ChangeUserIsAdminCommand)
export class ChangeUserIsAdminHandler implements ICommandHandler<ChangeUserIsAdminCommand> {
    constructor(private readonly service: UserService) {

    }
    execute (command: ChangeUserIsAdminCommand): Promise<any> {
        return this.service.changeUserIsAdmin(command.id)
    }
}