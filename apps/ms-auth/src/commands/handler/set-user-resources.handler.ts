import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { SetUserResourcesCommand } from '../impl/set-user-resources.command';
import { AddUserResourcesModel } from 'libs/shared/dtos/ms-auth/add-user-resources.model';

@CommandHandler(SetUserResourcesCommand)
export class SetUserResourcesHandler
  implements ICommandHandler<SetUserResourcesCommand>
{
  constructor(private readonly service: UserService) {}
  execute(command: SetUserResourcesCommand): Promise<any> {
    return this.service.setUserResources(command.id, command.model);
  }
}
