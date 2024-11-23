import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { GetPermissionByNameQuery } from "../impl/get-permission-by-name.query";
@QueryHandler(GetPermissionByNameQuery)
export class GetPermissionByNameHandler implements IQueryHandler<GetPermissionByNameQuery> {
    constructor(private readonly service: UserService){}
    execute (query: GetPermissionByNameQuery): Promise<any> {
        return this.service.getPermissionByName(query.name)
    }
}