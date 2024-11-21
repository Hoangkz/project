import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseQueryResultDto } from "libs/shared/base/base-query-result.dto";

export class UserResourceResult extends BaseQueryResultDto {
    @ApiProperty({
        nullable: false,
    })
    name: string;

    @ApiProperty({
        type: String,
        nullable: false,
    })
    resourceType: string;

    @ApiPropertyOptional({
        name: 'role',
        type: String,
        default: 'owner'
    })
    role?: string

    @ApiProperty({
        type: String,
        nullable: false,
    })
    resourceId: string;
}