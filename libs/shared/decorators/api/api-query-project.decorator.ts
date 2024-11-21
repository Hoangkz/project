import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function ApiQueryProjectId(){
    return applyDecorators(
        ApiQuery({
            name: 'projectId',
            type: String,
            required: true,
            description: 'Id dự án',
        })
    )
}