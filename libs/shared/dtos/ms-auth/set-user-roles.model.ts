import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class SetUserRolesModel {
    @ApiProperty({
        name: 'roleIds',
        type: Array<UUID>,
        nullable: false,
        required: false,
        default: []
    })
    roleIds: string[]

}