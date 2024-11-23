import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { FindUsersQuery } from "../impl/find-users.query";
@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IQueryHandler<FindUsersQuery> {
    constructor(public readonly service: UserService){}

    execute (query: FindUsersQuery): Promise<any> {
        return this.service.findUsers(query.model)
    }

}