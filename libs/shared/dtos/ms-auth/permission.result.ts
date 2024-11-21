import { ApiProperty } from "@nestjs/swagger";
import { ApiPermissions, ApiPermissionTypes } from "libs/permissions";
import { BaseQueryResultDto } from "libs/shared/base/base-query-result.dto";

export class PermissionResult extends BaseQueryResultDto {
    @ApiProperty({
        nullable: false,
        enum: ApiPermissions,
        enumName: 'ApiPermissions'
    })
    name: ApiPermissionTypes;

    @ApiProperty({
        nullable: true
    })
    description?: string;
}