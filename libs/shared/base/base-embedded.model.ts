import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class BaseEmbeddedModel {
    @ApiProperty({
        type: UUID,
        nullable: false
    })
    @IsUUID()
    id: string;

    @ApiProperty({
        type: String,
        nullable: true
    })
    @IsOptional()
    name: string;
}