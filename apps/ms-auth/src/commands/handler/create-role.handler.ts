import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RpcException } from "@nestjs/microservices";
import { UserService } from "../../user.service";
import { CreateRoleCommand } from "../impl/create-role.command";

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand>{
    constructor(private readonly service: UserService){

    }
    async execute(command: CreateRoleCommand): Promise<any> {
        try {
            return this.service.createRole(command.model)
        } catch (error) {
            throw new RpcException(error)
        }
    }
}