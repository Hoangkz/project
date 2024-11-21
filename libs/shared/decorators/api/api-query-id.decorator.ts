import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function ApiQueryId(){
    return applyDecorators(
        ApiQuery({
            name: 'id',
            type: String,
            required: true,
            description: 'Id đối tượng cần truy vấn'
        }),
    )
}