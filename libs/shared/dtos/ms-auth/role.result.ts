import { ApiProperty } from "@nestjs/swagger";
import { BaseQueryResultDto } from "libs/shared/base/base-query-result.dto";
import { UserGroupType } from "libs/shared/constants/user-group.type";
import { PermissionResult } from "./permission.result";

export class RoleResult extends BaseQueryResultDto{
    /** Tên vai trò, mặc định hệ thống gồm: admin, manager, user, Các phòng ban và đối tác tự động sinh 2 vai trò manager và user */
	@ApiProperty({
        nullable: false
    })
    name: string;

    @ApiProperty({
        nullable: true
    })
    /**Mô tả về vai trò */
	description?: string;

    @ApiProperty({
        enum: UserGroupType,
        enumName: "UserGroupType",
        nullable: false
    })
    userGroup: UserGroupType

    @ApiProperty({
        type: PermissionResult,
        isArray: true
    })
    permissions: PermissionResult[];
}