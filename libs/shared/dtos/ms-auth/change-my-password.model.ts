import { ApiPropertyOptional } from "@nestjs/swagger";

export class ChangeMyPasswordModel {
    @ApiPropertyOptional({
    })
    oldPassword?: string;

    @ApiPropertyOptional({
    })
    password?: string;
}