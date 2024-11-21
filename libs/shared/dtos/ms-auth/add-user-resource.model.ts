import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class BaseAddUserResourceModel {
    @ApiProperty({
        name: "resourceId",
        required: true,
        nullable:false
    })
	resourceId: string

    @ApiPropertyOptional({
        name: 'role',
        type: String,
        default: 'owner'
    })
    role?: string

    @ApiProperty({
        name: "name",
        required: true,
        nullable: false
    })
    name: string
}

export class AddUserResourceModel extends BaseAddUserResourceModel{
    @ApiProperty({
        name: "resourceType",
        required: true,
        nullable:false,
    })
	resourceType: string

}
