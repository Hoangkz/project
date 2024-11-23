import { UserGroupType } from "libs/shared/constants/user-group.type";
import { UserGroup } from "libs/shared/entities/general/base-user-group.entity";

export class UpdateAllUserGroupCommand {
    constructor(public readonly groupType: UserGroupType, public readonly group: (UserGroup | undefined)){}
}