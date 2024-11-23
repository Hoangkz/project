import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from "../../user.service";
import { GetUserByIdQuery } from "../impl/get-user-by-id.query";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
    constructor(private readonly authService: UserService){}
    async execute (query: GetUserByIdQuery){
        return this.authService.getUserById(query.id)
    }
}