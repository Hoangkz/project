export enum MsAuthCommand {
  CreateUser = 'CreateUser',
  ChangeUserPassword = 'ChangeUserPassword',
  ChangeMyPassword = 'ChangeMyPassword',
  UpdateUser = 'UpdateUser',
  DeleteUser = 'DeleteUser',
  ChangeUserActived = 'ChangeUserActived',
  ChangeUserIsAdmin = 'ChangeUserIsAdmin',

  CreateRole = 'CreateRole',
  DeleteRole = 'DeleteRole',
  UpdateRole = 'UpdateRole',
  DuplicateRole = 'DuplicateRole',

  SetUserRoles = 'SetUserRoles',

  CreatePermission = 'CreatePermission',
  DeletePermission = 'RemovePermission',
  UpdatePermission = 'UpdatePermission',

  AddUserResource = 'AddUserResource',
  AddUserResources = 'AddUserResources',
  RemoveUserResource = 'RemoveUserResource',
  RemoveUserResources = 'RemoveUserResources',
  RemoveUserResourcesByType = 'RemoveUserResourceByType',
  RemoveUserResourceByResourceId = 'RemoveUserResourceByResourceId',
  SetUserResources = 'SetUserResources',
  ClearUserResources = 'ClearUserResources',
  UpdateResourceName = 'UpdateResourceName',
  DeleteUserResourceOfUser = 'DeleteUserResourceOfUser',

  CreateUserAccessLog = 'CreateUserAccessLog',
}
