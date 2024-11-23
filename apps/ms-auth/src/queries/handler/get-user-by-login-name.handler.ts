import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from "../../user.service";
import { GetUserByLoginNameQuery } from '../impl/get-user-by-login-name.query';

@QueryHandler(GetUserByLoginNameQuery)
export class GetUserByLoginNameHandler implements IQueryHandler<GetUserByLoginNameQuery> {
    constructor(private readonly authService: UserService){}
    execute (query: GetUserByLoginNameQuery){
        return this.authService.getUserByLoginName(query.loginName)
    }
}