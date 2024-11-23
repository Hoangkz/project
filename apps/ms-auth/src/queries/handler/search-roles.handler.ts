import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { SearchRolesQuery } from "../impl/search-roles.query";
@QueryHandler(SearchRolesQuery)
export class SearchRolesHandler implements IQueryHandler<SearchRolesQuery> {
    constructor(public readonly service: UserService){}

    execute (query: SearchRolesQuery): Promise<any> {
        return this.service.searchRoles(query.model)
    }

}