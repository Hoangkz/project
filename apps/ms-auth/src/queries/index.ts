import { FindPermissionsHandler } from './handler/find-permissions.handler';
import { FindRolesHandler } from './handler/find-roles.handler';
import { FindUsersHandler } from './handler/find-users.handler';
import { GetMeHandler } from './handler/get-me.handler';
import { GetPermissionByIdHandler } from './handler/get-permission-by-id.handler';
import { GetPermissionByNameHandler } from './handler/get-permission-by-name.handler';
import { GetRoleByIdHandler } from './handler/get-role-by-id.handler';
import { GetRoleByNameHandler } from './handler/get-role-by-name.handler';
import { GetUserByIdHandler } from './handler/get-user-by-id.handler';
import { GetUserByLoginNameHandler } from './handler/get-user-by-login-name.handler';
import { LoginHandler } from './handler/login.handler';
import { SearchPermissionsHandler } from './handler/search-permissions.handler';
import { SearchRolesHandler } from './handler/search-roles.handler';
import { SearchUserResourcesHandler } from './handler/search-user-resources.handler';
import { SearchUsersHandler } from './handler/search-users.handler';
import { SignUserTokenHandler } from './handler/sign-user-token.handler';
import { VerifyTokenHandler } from './handler/verify-token.handler';

export const queryHandlers = [
  VerifyTokenHandler,
  GetUserByIdHandler,
  GetUserByLoginNameHandler,
  LoginHandler,
  SignUserTokenHandler,
  GetMeHandler,
  FindUsersHandler,
  SearchUsersHandler,
  SearchUserResourcesHandler,

  GetRoleByIdHandler,
  GetRoleByNameHandler,
  FindRolesHandler,
  SearchRolesHandler,

  GetPermissionByIdHandler,
  GetPermissionByNameHandler,
  FindPermissionsHandler,
  SearchPermissionsHandler,
];
