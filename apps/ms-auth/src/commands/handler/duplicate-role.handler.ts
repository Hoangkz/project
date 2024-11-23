import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { DuplicateRoleCommand } from "../impl/duplicate-role.command";

@CommandHandler(DuplicateRoleCommand)
export class DuplicateRoleHandler implements ICommandHandler<DuplicateRoleCommand>{
    constructor(private readonly service: UserService){

    }
    execute(command: DuplicateRoleCommand): Promise<any> {
        return this.service.duplicateRole(command.model)
    }
}