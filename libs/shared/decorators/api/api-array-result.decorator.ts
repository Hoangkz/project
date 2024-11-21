import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export function ApiArrayResult(type: Function | [Function], description?: string){
    return applyDecorators(
        ApiResponse({
            type: type,
            isArray: true,
            description: description
        }),
    )
}