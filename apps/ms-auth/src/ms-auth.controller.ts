import { Body, Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { BaseMsController } from 'libs/shared/base/base-ms.controller';
import { MsAuthCommand } from 'libs/shared/cqrs/commands/ms-auth.command';
import { MsAuthQuery } from 'libs/shared/cqrs/query/ms-auth.query';
import { AddUserResourceModel } from 'libs/shared/dtos/ms-auth/add-user-resource.model';
import { AddUserResourcesModel } from 'libs/shared/dtos/ms-auth/add-user-resources.model';
import { CreatePermissionModel } from 'libs/shared/dtos/ms-auth/create-permission.model';
import { CreateRoleModel } from 'libs/shared/dtos/ms-auth/create-role.model';
import { CreateUserAccessLogModel } from 'libs/shared/dtos/ms-auth/create-user-access-log.model';
import { CreateUserModel } from 'libs/shared/dtos/ms-auth/create-user.model';
import { DuplicateRoleModel } from 'libs/shared/dtos/ms-auth/duplicate-role.model';
import { FindPermissionsModel } from 'libs/shared/dtos/ms-auth/find-permissions.model';
import { FindRolesModel } from 'libs/shared/dtos/ms-auth/find-roles.model';
import { FindUsersModel } from 'libs/shared/dtos/ms-auth/find-users.model';
import { SearchPermissionsModel } from 'libs/shared/dtos/ms-auth/search-permissions.model';
import { SearchRolesModel } from 'libs/shared/dtos/ms-auth/search-roles.model';
import { SearchUserResourcesModel } from 'libs/shared/dtos/ms-auth/search-user-resources.model';
import { SearchUsersModel } from 'libs/shared/dtos/ms-auth/search-users.model';
import { UpdatePermissionModel } from 'libs/shared/dtos/ms-auth/update-permission.model';
import { UpdateRoleModel } from 'libs/shared/dtos/ms-auth/update-role.model';
import { UserLoginModel } from 'libs/shared/dtos/ms-auth/user-login.model';
import { IUpdateBody } from 'libs/shared/interfaces/ms-update-body.interface';
import { AddUserResourceCommand } from './commands/impl/add-user-resource.command';
import { AddUserResourcesCommand } from './commands/impl/add-user-resources.command';
import { ChangeMyPasswordCommand } from './commands/impl/change-my-password.command';
import { ChangeUserActivedCommand } from './commands/impl/change-user-actived.command';
import { ChangeUserIsAdminCommand } from './commands/impl/change-user-is-admin.command';
import { ChangeUserPasswordCommand } from './commands/impl/change-user-password.command';
import { ClearUserResourcesCommand } from './commands/impl/clear-user-resources.command';
import { CreatePermissionCommand } from './commands/impl/create-permission.command';
import { CreateRoleCommand } from './commands/impl/create-role.command';
import { CreateUserAccessLogCommand } from './commands/impl/create-user-access-log.command';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { DeletePermissionCommand } from './commands/impl/delete-permission.command';
import { DeleteRoleCommand } from './commands/impl/delete-role.command';
import { DeleteUserResourceOfUserCommand } from './commands/impl/delete-user-resource-of-user.command';
import { DeleteUserCommand } from './commands/impl/delete-user.command';
import { DuplicateRoleCommand } from './commands/impl/duplicate-role.command';
import { RemoveUserResourceByResourceIdCommand } from './commands/impl/remove-user-resource-by-resource-id.command';
import { RemoveUserResourceCommand } from './commands/impl/remove-user-resource.command';
import { RemoveUserResourcesByTypeCommand } from './commands/impl/remove-user-resources-by-type.command';
import { RemoveUserResourcesCommand } from './commands/impl/remove-user-resources.command';
import { UpdatePermissionCommand } from './commands/impl/update-permission.command';
import { UpdateRoleCommand } from './commands/impl/update-role.command';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { FindPermissionsQuery } from './queries/impl/find-permissions.query';
import { FindRolesQuery } from './queries/impl/find-roles.query';
import { FindUsersQuery } from './queries/impl/find-users.query';
import { GetMeQuery } from './queries/impl/get-me.query';
import { GetPermissionByNameQuery } from './queries/impl/get-permission-by-name.query';
import { GetPermissionByIdQuery } from './queries/impl/get-permission-id.query';
import { GetRoleByIdQuery } from './queries/impl/get-role-by-id.query';
import { GetRoleByNameQuery } from './queries/impl/get-role-by-name.query';
import { GetUserByIdQuery } from './queries/impl/get-user-by-id.query';
import { GetUserByLoginNameQuery } from './queries/impl/get-user-by-login-name.query';
import { LoginQuery } from './queries/impl/login.query';
import { SearchPermissionsQuery } from './queries/impl/search-permissions.query';
import { SearchRolesQuery } from './queries/impl/search-roles.query';
import { SearchUserResourcesQuery } from './queries/impl/search-user-resources.query';
import { SearchUsersQuery } from './queries/impl/search-users.query';
import { SignUserTokenQuery } from './queries/impl/sign-user-token.query';
import { VerifyTokenQuery } from './queries/impl/verify-token.query';

@Controller()
export class MsAuthController extends BaseMsController {
  @MessagePattern(MsAuthQuery.GetUserById)
  async getUserById(@Ctx() context: RmqContext, @Body() id: string) {
    return this.query(context, new GetUserByIdQuery(id));
  }

  @MessagePattern(MsAuthQuery.GetMe)
  async getMe(@Ctx() context: RmqContext, @Body() id: string) {
    return this.query(context, new GetMeQuery(id));
  }

  @MessagePattern(MsAuthQuery.VerifyToken)
  async verifyToken(@Ctx() context: RmqContext, @Body() token: string) {
    return this.query(context, new VerifyTokenQuery(token));
  }

  @MessagePattern(MsAuthQuery.GetUserByLoginName)
  async getUserByLoginName(
    @Ctx() context: RmqContext,
    @Body() loginName: string,
  ) {
    return this.query(context, new GetUserByLoginNameQuery(loginName));
  }

  @MessagePattern(MsAuthQuery.Login)
  async login(@Ctx() context: RmqContext, @Body() model: UserLoginModel) {
    return this.query(context, new LoginQuery(model.loginName, model.password));
  }

  @MessagePattern(MsAuthQuery.SearchUsers)
  async searchUsers(
    @Ctx() context: RmqContext,
    @Body() model: SearchUsersModel,
  ) {
    return this.query(context, new SearchUsersQuery(model));
  }

  @MessagePattern(MsAuthQuery.FindUsers)
  async findUsers(@Ctx() context: RmqContext, @Body() model: FindUsersModel) {
    return this.query(context, new FindUsersQuery(model));
  }

  @MessagePattern(MsAuthQuery.SignUserToken)
  async signUserToken(@Ctx() context: RmqContext, @Body() userId: string) {
    return this.query(context, new SignUserTokenQuery(userId));
  }

  @MessagePattern(MsAuthCommand.CreateUser)
  async createUser(@Ctx() context: RmqContext, @Body() model: CreateUserModel) {
    return this.command(context, new CreateUserCommand(model));
  }

  @MessagePattern(MsAuthCommand.ChangeMyPassword)
  async changeMyPassword(
    @Ctx() context: RmqContext,
    @Body() { id, model }: any,
  ) {
    return this.command(context, new ChangeMyPasswordCommand(id, model));
  }

  @MessagePattern(MsAuthCommand.ChangeUserActived)
  async changeUserActived(@Ctx() context: RmqContext, @Body() id: string) {
    return this.command(context, new ChangeUserActivedCommand(id));
  }

  @MessagePattern(MsAuthCommand.ChangeUserIsAdmin)
  async changeUserIsAdmin(@Ctx() context: RmqContext, @Body() id: string) {
    return this.command(context, new ChangeUserIsAdminCommand(id));
  }

  @MessagePattern(MsAuthCommand.ChangeUserPassword)
  async changeUserPassword(
    @Ctx() context: RmqContext,
    @Body() { id, password }: any,
  ) {
    return this.command(context, new ChangeUserPasswordCommand(id, password));
  }

  @MessagePattern(MsAuthCommand.DeleteUser)
  async deleteUser(@Ctx() context: RmqContext, @Body() id: string) {
    return this.command(context, new DeleteUserCommand(id));
  }

  @MessagePattern(MsAuthCommand.UpdateUser)
  async updateUser(@Ctx() context: RmqContext, @Body() { id, model }: any) {
    return this.command(context, new UpdateUserCommand(id, model));
  }

  //-----------Role
  @MessagePattern(MsAuthQuery.GetRoleById)
  async getRoleById(@Ctx() context: RmqContext, @Body() id: string) {
    return this.query(context, new GetRoleByIdQuery(id));
  }

  @MessagePattern(MsAuthQuery.GetRoleByName)
  async getRoleByName(@Ctx() context: RmqContext, @Body() name: string) {
    return this.query(context, new GetRoleByNameQuery(name));
  }

  @MessagePattern(MsAuthQuery.FindRoles)
  async findRoles(@Ctx() context: RmqContext, @Body() model: FindRolesModel) {
    return this.query(context, new FindRolesQuery(model));
  }

  @MessagePattern(MsAuthQuery.SearchRoles)
  async searchRoles(
    @Ctx() context: RmqContext,
    @Body() model: SearchRolesModel,
  ) {
    return this.query(context, new SearchRolesQuery(model));
  }

  @MessagePattern(MsAuthCommand.CreateRole)
  async createRoles(
    @Ctx() context: RmqContext,
    @Body() model: CreateRoleModel,
  ) {
    return this.command(context, new CreateRoleCommand(model));
  }

  @MessagePattern(MsAuthCommand.UpdateRole)
  async updateRoles(
    @Ctx() context: RmqContext,
    @Body() { id, model }: IUpdateBody<UpdateRoleModel>,
  ) {
    return this.command(context, new UpdateRoleCommand(id, model));
  }

  @MessagePattern(MsAuthCommand.DeleteRole)
  async deleteRoles(@Ctx() context: RmqContext, @Body() id: string) {
    return this.command(context, new DeleteRoleCommand(id));
  }

  @MessagePattern(MsAuthCommand.DuplicateRole)
  async duplicateRole(
    @Ctx() context: RmqContext,
    @Body() model: DuplicateRoleModel,
  ) {
    return this.command(context, new DuplicateRoleCommand(model));
  }

  //-----------Permission
  @MessagePattern(MsAuthQuery.GetPermissionById)
  async getPermissionById(@Ctx() context: RmqContext, @Body() id: string) {
    return this.query(context, new GetPermissionByIdQuery(id));
  }

  @MessagePattern(MsAuthQuery.GetPermissionByName)
  async getPermissionByName(@Ctx() context: RmqContext, @Body() name: string) {
    return this.query(context, new GetPermissionByNameQuery(name));
  }

  @MessagePattern(MsAuthQuery.FindPermissions)
  async findPermissions(
    @Ctx() context: RmqContext,
    @Body() model: FindPermissionsModel,
  ) {
    return this.query(context, new FindPermissionsQuery(model));
  }

  @MessagePattern(MsAuthQuery.SearchPermissions)
  async searchPermissions(
    @Ctx() context: RmqContext,
    @Body() model: SearchPermissionsModel,
  ) {
    return this.query(context, new SearchPermissionsQuery(model));
  }

  @MessagePattern(MsAuthCommand.CreatePermission)
  async createPermissions(
    @Ctx() context: RmqContext,
    @Body() model: CreatePermissionModel,
  ) {
    return this.command(context, new CreatePermissionCommand(model));
  }

  @MessagePattern(MsAuthCommand.UpdatePermission)
  async updatePermissions(
    @Ctx() context: RmqContext,
    @Body() { id, model }: IUpdateBody<UpdatePermissionModel>,
  ) {
    return this.command(context, new UpdatePermissionCommand(id, model));
  }

  @MessagePattern(MsAuthCommand.DeletePermission)
  async deletePermissions(@Ctx() context: RmqContext, @Body() id: string) {
    return this.command(context, new DeletePermissionCommand(id));
  }

  //---------------User Resources

  @MessagePattern(MsAuthCommand.AddUserResource)
  async addUserResource(
    @Ctx() context: RmqContext,
    @Body() { id, model }: IUpdateBody<AddUserResourceModel>,
  ) {
    return this.command(context, new AddUserResourceCommand(id, model));
  }

  @MessagePattern(MsAuthCommand.AddUserResources)
  async addUserResources(
    @Ctx() context: RmqContext,
    @Body() { id, model }: IUpdateBody<AddUserResourcesModel>,
  ) {
    return this.command(context, new AddUserResourcesCommand(id, model));
  }

  @MessagePattern(MsAuthCommand.RemoveUserResource)
  async removeUserResource(
    @Ctx() context: RmqContext,
    @Body() { id, model }: IUpdateBody<string>,
  ) {
    return this.command(context, new RemoveUserResourceCommand(id, model));
  }

  @MessagePattern(MsAuthCommand.RemoveUserResources)
  async removeUserResources(
    @Ctx() context: RmqContext,
    @Body() { id, model }: IUpdateBody<string[]>,
  ) {
    return this.command(context, new RemoveUserResourcesCommand(id, model));
  }

  @MessagePattern(MsAuthCommand.RemoveUserResourcesByType)
  async removeUserResourceByType(
    @Ctx() context: RmqContext,
    @Body() { id, model }: IUpdateBody<string>,
  ) {
    return this.command(
      context,
      new RemoveUserResourcesByTypeCommand(id, model),
    );
  }

  @MessagePattern(MsAuthCommand.DeleteUserResourceOfUser)
  async deleteUserResourceOfUser(
    @Ctx() context: RmqContext,
    @Body() { resourceId, userId }: { resourceId: string; userId: string },
  ) {
    return this.command(
      context,
      new DeleteUserResourceOfUserCommand(resourceId, userId),
    );
  }

  @MessagePattern(MsAuthCommand.ClearUserResources)
  async clearUserResources(@Ctx() context: RmqContext, @Body() id: string) {
    return this.command(context, new ClearUserResourcesCommand(id));
  }

  @MessagePattern(MsAuthCommand.RemoveUserResourceByResourceId)
  async removeUserResourceByResourceId(
    @Ctx() context: RmqContext,
    @Body() resourceId: string,
  ) {
    return this.command(
      context,
      new RemoveUserResourceByResourceIdCommand(resourceId),
    );
  }

  @MessagePattern(MsAuthQuery.SearchUserResources)
  async searchUserResources(
    @Ctx() context: RmqContext,
    @Body() model: SearchUserResourcesModel,
  ) {
    return this.query(context, new SearchUserResourcesQuery(model));
  }

  /**------------------AccessLog------------------ */
  @MessagePattern(MsAuthCommand.CreateUserAccessLog)
  async createUserAccessLog(
    @Ctx() context: RmqContext,
    @Body() model: CreateUserAccessLogModel,
  ) {
    this.rmqService.ack(context);
    return this.commandBus.execute(new CreateUserAccessLogCommand(model));
  }
}
