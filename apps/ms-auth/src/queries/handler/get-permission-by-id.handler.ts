import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { GetPermissionByIdQuery } from "../impl/get-permission-id.query";
@QueryHandler(GetPermissionByIdQuery)
export class GetPermissionByIdHandler implements IQueryHandler<GetPermissionByIdQuery> {
    constructor(private readonly service: UserService){}
    execute (query: GetPermissionByIdQuery): Promise<any> {
        return this.service.getPermissionById(query.id)
    }
}