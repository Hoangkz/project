import { applyDecorators, Type } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";

export function ApiModelBody(type: Type<unknown> | Function | [Function], description?: string){
    return applyDecorators(
        ApiBody({
            type: type,
            required: true,
            description: description
        }),
    )
}