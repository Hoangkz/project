import { ApiProperty } from "@nestjs/swagger";
import { BaseFindModel } from "libs/shared/base/base-pagination.model";

export class FindPermissionsModel extends BaseFindModel {
    @ApiProperty({
        name: 'roleIds',
        type: Array<String>,
        required: false,
        default: []
    })
    roleIds?: string[]
}