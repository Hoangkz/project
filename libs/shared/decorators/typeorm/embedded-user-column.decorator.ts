import { applyDecorators } from "@nestjs/common";
import { EmbeddedUserEntity } from "libs/shared/entities/embedded/embedded-user.entity";
import { Column } from "typeorm";

export function UserColumn (prefix: string = 'user'){
    return applyDecorators(Column(() => EmbeddedUserEntity, {
        prefix
    }))
}