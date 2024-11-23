import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'libs/shared/cqrs/events/ms-auth/user-created.event';
import { UserService } from '../../user.service';
import { CreateUserCommand } from '../impl/create-user.command';
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly authService: UserService, private readonly eventBus:EventBus){}
    async execute (command: CreateUserCommand){
        const user = await this.authService.createUser(command.model)
        this.eventBus.publish(new UserCreatedEvent(user))
        return user
    }

}