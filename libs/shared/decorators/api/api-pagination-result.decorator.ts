import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ExtraPaginationResult } from "libs/shared/base/pagination.result";
import { ObjectType } from "typeorm";

export function ApiPaginationResult<T>(classType: ObjectType<T>, description?: string){
    return applyDecorators(
        ApiResponse({
            type: ExtraPaginationResult<T>(classType),
            description: description
        }),
    )
}