import { applyDecorators } from "@nestjs/common";
import { Column } from "typeorm";

export function JoinColumnId(columnName: string){
    return applyDecorators(
        Column('uniqueidentifier', {
            nullable: true,
            name: columnName
        })
    )
}