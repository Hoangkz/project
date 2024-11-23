import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { FindRolesQuery } from "../impl/find-roles.query";
@QueryHandler(FindRolesQuery)
export class FindRolesHandler implements IQueryHandler<FindRolesQuery> {
    constructor(public readonly service: UserService){}

    execute (query: FindRolesQuery): Promise<any> {
        return this.service.findRoles(query.model)
    }

}