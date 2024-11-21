import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, Length } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class DuplicateRoleModel {
    @ApiProperty({
        required: true,
        name: 'roleId',
        type: UUID
    })
    @IsUUID()
    roleId: string;

    @ApiProperty({
        name: 'name',
        maxLength: 50,
        minLength: 3,
        required: true,
        type: String
    })
    @IsNotEmpty()
    @Length(3, 50, {
        message: 'Tên vai trò từ 3 tới 50 ký tự'
    })
    name: string

    @ApiPropertyOptional({
		type: String
	})
    description?: string
}