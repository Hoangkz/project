import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { responseError, responseSuccess } from 'libs/shared/microservice/create-response';
import { UserService } from '../../user.service';
import { ChangeUserPasswordCommand } from '../impl/change-user-password.command';
@CommandHandler(ChangeUserPasswordCommand)
export class ChangeUserPasswordHandler implements ICommandHandler<ChangeUserPasswordCommand> {
    constructor(private readonly authService: UserService){}
    async execute (command: ChangeUserPasswordCommand) {
        try {
            const user = await this.authService.changeUserPassword(command.id, command.password)
            return responseSuccess(user)
        } catch (error) {
            responseError(error)
        }
    }

}