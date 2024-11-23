import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { SearchPermissionsQuery } from "../impl/search-permissions.query";
@QueryHandler(SearchPermissionsQuery)
export class SearchPermissionsHandler implements IQueryHandler<SearchPermissionsQuery> {
    constructor(public readonly service: UserService){}

    execute (query: SearchPermissionsQuery): Promise<any> {
        return this.service.searchPermissions(query.model)
    }

}