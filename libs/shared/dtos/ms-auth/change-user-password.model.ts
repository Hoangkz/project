import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class ChangeUserPasswordModel {
    @ApiProperty({
        type: UUID,
        required: true
    })
    id: string

    @ApiPropertyOptional({
    })
    password?: string;
}