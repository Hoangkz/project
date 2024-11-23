import { AddUserResourceHandler } from './handler/add-user-resource.handler'
import { AddUserResourcesHandler } from './handler/add-user-resources.handler'
import { ChangeMyPasswordHandler } from './handler/change-my-password.handler'
import { ChangeUserActivedHandler } from './handler/change-user-actived.handler'
import { ChangeUserIsAdminHandler } from './handler/change-user-is-admin.handler'
import { ChangeUserPasswordHandler } from './handler/change-user-password.handler'
import { ClearUserResourcesHandler } from './handler/clear-user-resources.handler'
import { CreatePermissionHandler } from './handler/create-permission.handler'
import { CreateRoleHandler } from './handler/create-role.handler'
import { CreateUserAccessLogHandler } from './handler/create-user-access-log.handler'
import { CreateUserCommandHandler } from './handler/create-user.handler'
import { DeletePermissionHandler } from './handler/delete-permission.handler'
import { DeleteRoleHandler } from './handler/delete-role.handler'
import { DeleteUserResourceOfUserHandler } from './handler/delete-user-resource-of-user.handler'
import { DeleteUserHandler } from './handler/delete-user.handler'
import { DuplicateRoleHandler } from './handler/duplicate-role.handler'
import { RemoveUserResourceByResourceIdHandler } from './handler/remove-user-resource-by-resource-id.handler'
import { RemoveUserResourcesByTypeHandler } from './handler/remove-user-resource-by-type.handler'
import { RemoveUserResourceHandler } from './handler/remove-user-resource.handler'
import { RemoveUserResourcesHandler } from './handler/remove-user-resources.handler'
import { SetUserResourcesHandler } from './handler/set-user-resources.handler'
import { SetUserRolesHandler } from './handler/set-user-roles.handler'
import { UpdatePermissionHandler } from './handler/update-permission.handler'
import { UpdateResourceNameHandler } from './handler/update-resource-name.handler'
import { UpdateRoleHandler } from './handler/update-role.handler'
import { UpdateUserHandler } from './handler/update-user.handler'
export const commandHandlers = [
    CreateUserCommandHandler,
    ChangeUserPasswordHandler,
    ChangeMyPasswordHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    ChangeUserActivedHandler,
    ChangeUserIsAdminHandler,

    CreateRoleHandler,
    UpdateRoleHandler,
    DeleteRoleHandler,
    DuplicateRoleHandler,

    CreatePermissionHandler,
    UpdatePermissionHandler,
    DeletePermissionHandler,

    SetUserRolesHandler,

    AddUserResourceHandler,
    AddUserResourcesHandler,
    RemoveUserResourceHandler,
    RemoveUserResourcesHandler,
    RemoveUserResourcesByTypeHandler,
    RemoveUserResourceByResourceIdHandler,
    SetUserResourcesHandler,
    ClearUserResourcesHandler,
    UpdateResourceNameHandler,
    DeleteUserResourceOfUserHandler,

    CreateUserAccessLogHandler
]