import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { responseError, responseSuccess } from 'libs/shared/microservice/create-response';
import { UserService } from '../../user.service';
import { ChangeMyPasswordCommand } from '../impl/change-my-password.command';

@CommandHandler(ChangeMyPasswordCommand)
export class ChangeMyPasswordHandler implements ICommandHandler<ChangeMyPasswordCommand> {
    constructor(private readonly authService: UserService){}
    async execute (command: ChangeMyPasswordCommand) {
        try {
            const user = await this.authService.changeMyPassword(command.id, command.model)
            return responseSuccess(user)
        } catch (error) {
            responseError(error)
        }
    }

}