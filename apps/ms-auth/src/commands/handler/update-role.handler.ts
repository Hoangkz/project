import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../user.service';
import { UpdateRoleCommand } from '../impl/update-role.command';
@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(private readonly service: UserService) {}
  execute(command: UpdateRoleCommand): Promise<any> {
    return this.service.updateRole(command.id, command.model);
  }
}
