import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export abstract class BaseEmbeddedResult {
    @ApiProperty({ description: '' })
    @Expose()
    name: string;

    @ApiProperty({ description: '' })
    @Expose()
    id: string;

    @ApiProperty({ description: '' })
    @Expose()
    code: string;
}