import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { GetRoleByNameQuery } from "../impl/get-role-by-name.query";

@QueryHandler(GetRoleByNameQuery)
export class GetRoleByNameHandler implements IQueryHandler<GetRoleByNameQuery>{
    constructor(public readonly service: UserService){

    }

    execute (query: GetRoleByNameQuery): Promise<any> {
        return this.service.getRoleByName(query.roleName)
    }

}