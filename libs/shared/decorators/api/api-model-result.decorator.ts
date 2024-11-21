import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export function ApiModelResult(type: Function | [Function], description?: string){
    return applyDecorators(
        ApiResponse({
            type: type,
            description: description
        }),
    )
}