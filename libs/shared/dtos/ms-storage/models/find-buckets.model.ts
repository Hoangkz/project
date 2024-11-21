import { ApiPropertyOptional } from "@nestjs/swagger";
import { BaseFindModel } from "libs/shared/base/base-pagination.model";

export class FindBucketsModel extends BaseFindModel {
    @ApiPropertyOptional({
        name: "rootId",
        description: "Id bucket cha",
        required: false,
        nullable: true
    })
    rootId?: string
}