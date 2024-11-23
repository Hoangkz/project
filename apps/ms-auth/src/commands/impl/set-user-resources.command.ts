import { BaseUpdateCommand } from 'libs/shared/base/base-update.command';
import { AddUserResourceModel } from 'libs/shared/dtos/ms-auth/add-user-resource.model';

export class SetUserResourcesCommand extends BaseUpdateCommand<AddUserResourceModel> {}
