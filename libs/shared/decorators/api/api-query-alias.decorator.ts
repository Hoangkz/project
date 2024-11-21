import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function ApiQueryAlias(){
    return applyDecorators(
        ApiQuery({
            name: 'alias',
            type: String,
            required: true,
            description: 'Alias đối tượng cần truy vấn'
        }),
    )
}