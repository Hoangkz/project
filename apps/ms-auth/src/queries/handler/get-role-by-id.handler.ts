import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { GetRoleByIdQuery } from "../impl/get-role-by-id.query";

@QueryHandler(GetRoleByIdQuery)
export class GetRoleByIdHandler implements IQueryHandler<GetRoleByIdQuery>{
    constructor(private readonly service: UserService){}
    execute (query: GetRoleByIdQuery): Promise<any> {
        return this.service.getRoleById(query.id)
    }

}