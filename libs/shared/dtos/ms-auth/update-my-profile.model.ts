import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { MetadataModel } from "../general/metadata.model";

export class UpdateMyProfileModel {
    @ApiProperty({
        required: true,
        type: String,
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        nullable: false,
        required: true,
        name: "loginName",
        maxLength: 60,
    })
    @IsNotEmpty()
    loginName: string;

    @ApiProperty({
        required: true,
        nullable: false,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        type: Object,
        nullable: true,
        required: false,
        default: {}
    })
    metadata: MetadataModel[]
}