import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { FindPermissionsQuery } from "../impl/find-permissions.query";
@QueryHandler(FindPermissionsQuery)
export class FindPermissionsHandler implements IQueryHandler<FindPermissionsQuery> {
    constructor(public readonly service: UserService){}

    execute (query: FindPermissionsQuery): Promise<any> {
        return this.service.findPermissions(query.model)
    }

}