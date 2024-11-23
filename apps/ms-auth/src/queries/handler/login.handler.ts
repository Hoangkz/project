import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { UserService } from "../../user.service";
import { LoginQuery } from '../impl/login.query';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
    constructor(private readonly authService: UserService){}
    async execute (query: LoginQuery){
        try {
            return this.authService.login(query.loginName, query.password)
        } catch (error) {
            throw new RpcException(error)
        }
    }
}