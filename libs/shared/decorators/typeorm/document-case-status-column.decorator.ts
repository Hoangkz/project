import { applyDecorators } from "@nestjs/common";
import { DocumentCaseStatus } from "libs/shared/constants/document-case-status.enum";
import { Column } from "typeorm";

export function DocumentCaseStatusColumn(columnName: string = 'status'){
    return applyDecorators(
        Column('varchar', {
            nullable: false,
            name: columnName,
            default: DocumentCaseStatus.DRAFT
        })
    )
}