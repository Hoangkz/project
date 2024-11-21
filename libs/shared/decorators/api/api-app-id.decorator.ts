import { applyDecorators } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

export function ApiAppAuthentication(){
    return applyDecorators(
        ApiHeader({
            name: 'AppAuthentication',
            allowEmptyValue: false,
            required: true,
            description: 'Chữ ký ứng dụng'
        }),
    )
}