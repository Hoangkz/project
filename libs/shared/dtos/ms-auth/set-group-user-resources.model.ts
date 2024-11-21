import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { BaseAddUserResourceModel } from "./add-user-resource.model";

export class SetGroupUserResourcesModel {
    @ApiProperty({
        required: true,
        nullable: false
    })
    resourceType: string

    @ApiProperty({
        type: () => BaseAddUserResourceModel,
        required: true,
        nullable: false,
        isArray: true,
        default: []
    })
    @IsArray()
    resources: BaseAddUserResourceModel[]
}

export class SetGroupsUserResourcesModel {
    @ApiProperty({
        type: () => SetGroupUserResourcesModel,
        isArray: true,
        nullable: false,
        default: []
    })
    @IsArray()
    groups: SetGroupUserResourcesModel[]
}
