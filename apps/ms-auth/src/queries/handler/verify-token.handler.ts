import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { UserService } from "../../user.service";
import { VerifyTokenQuery } from "../impl/verify-token.query";

@QueryHandler(VerifyTokenQuery)
export class VerifyTokenHandler implements IQueryHandler<VerifyTokenQuery> {
    constructor(private readonly service: UserService){

    }
    execute (query: VerifyTokenQuery): Promise<any> {
        return this.service.verifyToken(query.token)
    }
}