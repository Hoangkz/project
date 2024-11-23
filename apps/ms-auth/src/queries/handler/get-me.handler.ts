import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { GetMeQuery } from "../impl/get-me.query";
@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery>{
    constructor(private readonly service:UserService){

    }
    execute (query: GetMeQuery): Promise<any> {
        return this.service.getMe(query.id)
    }

}