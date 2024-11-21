import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserResource } from "libs/shared/entities/ms-auth/user-resource.entity";

export const UserResources = createParamDecorator((data: UserResource[], ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        return request.user ? request.user.resources : []
    })