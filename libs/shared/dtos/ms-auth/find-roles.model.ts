import { ApiProperty } from "@nestjs/swagger";
import { BaseFindModel } from "libs/shared/base/base-pagination.model";
import { UserGroupType } from "libs/shared/constants/user-group.type";

export class FindRolesModel extends BaseFindModel {
    @ApiProperty({
        enum: UserGroupType,
        enumName: "UserGroupType",
        required: false
    })
    userGroupType?: UserGroupType
}