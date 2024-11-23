import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { ChangeUserActivedCommand } from "../impl/change-user-actived.command";

@CommandHandler(ChangeUserActivedCommand)
export class ChangeUserActivedHandler implements ICommandHandler<ChangeUserActivedCommand> {
    constructor(private readonly service: UserService) {

    }
    execute (command: ChangeUserActivedCommand): Promise<any> {
        return this.service.changeUserActived(command.id)
    }
}