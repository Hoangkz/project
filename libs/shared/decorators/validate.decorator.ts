import { applyDecorators, BadRequestException } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer";
import { IsArray, IsDate, isDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"
import { isNull, isUndefined } from 'lodash';
//tuannv
type UUIDOptions = { optional?: boolean; each?: boolean };
export const ValidateUUID = (options?: UUIDOptions) => {
    const { optional, each } = { optional: false, each: false, ...options };
    return applyDecorators(
        IsUUID(undefined, { each }),
        ApiProperty({ format: 'uuid' }),
        optional ? IsOptional() : IsNotEmpty(),
        each ? IsArray() : IsString(),
    );
};


type DateOptions = {}
export const ValidateDate = (options: DateOptions) => {
    const { } = { ...options }
    const decorators = [
        ApiProperty(),
        IsDate(),
        Transform(({ key, value }) => {
            if (isNull(value) || isUndefined(value)) {
                return value
            }
            if (!isDateString(value)) {
                throw new BadRequestException(`${key} phải là kiểu date string`);
            }
            return new Date(value as string)
        })
    ]
    return applyDecorators(...decorators);
}