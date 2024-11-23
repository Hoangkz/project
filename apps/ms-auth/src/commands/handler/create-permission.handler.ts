import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { CreatePermissionCommand } from "../impl/create-permission.command";

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler implements ICommandHandler<CreatePermissionCommand>{
    constructor(private readonly service: UserService){

    }
    execute(command: CreatePermissionCommand): Promise<any> {
        return this.service.createPermission(command.model)
    }
}