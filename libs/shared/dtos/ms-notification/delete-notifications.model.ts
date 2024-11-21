import { ApiProperty } from "@nestjs/swagger";

export class DeleteNotificationsModel {
    @ApiProperty({
        type: String,
        isArray: true,
        required: true,
        nullable: false,
        minItems: 1
    })
    ids: string[]
}