import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { CreateUserAccessLogCommand } from "../impl/create-user-access-log.command";

@CommandHandler(CreateUserAccessLogCommand)
export class CreateUserAccessLogHandler implements ICommandHandler<CreateUserAccessLogCommand>{
    constructor(private readonly service: UserService){

    }
    execute (command: CreateUserAccessLogCommand): Promise<any> {
        return this.service.createUserAccessLog(command.model)
    }
}