import { AllowPermissions } from '@libs/auth-lib/decorators/allow-permissions.decorator';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject, ParseUUIDPipe,
  Post, Query, UseInterceptors
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { ApiPermissions } from 'libs/permissions';
import { MsAuthCommand } from 'libs/shared/cqrs/commands/ms-auth.command';
import { MsAuthQuery } from 'libs/shared/cqrs/query/ms-auth.query';
import { ApiQueryId } from 'libs/shared/decorators/api/api-query-id.decorator';
import { CreatePermissionModel } from 'libs/shared/dtos/ms-auth/create-permission.model';
import { CreateRoleModel } from 'libs/shared/dtos/ms-auth/create-role.model';
import { FindPermissionsModel } from 'libs/shared/dtos/ms-auth/find-permissions.model';
import { FindRolesModel } from 'libs/shared/dtos/ms-auth/find-roles.model';
import { SearchPermissionsModel } from 'libs/shared/dtos/ms-auth/search-permissions.model';
import { SearchRolesModel } from 'libs/shared/dtos/ms-auth/search-roles.model';
import { UpdatePermissionModel } from 'libs/shared/dtos/ms-auth/update-permission.model';
import { UpdateRoleModel } from 'libs/shared/dtos/ms-auth/update-role.model';
import { catchRpcException } from 'libs/shared/microservice/create-response';
import { MS_AUTH } from 'libs/shared/services';

@Controller('/role')
@UseInterceptors(ClassSerializerInterceptor)
export class RoleController {
  constructor(
    @Inject(MS_AUTH) private readonly msAuth: ClientProxy,
  ) {}

  //---------------Role ------------------//
  @Get('get-role-by-name/:name')
  @ApiQuery({
    type: String,
    required: true,
    name: 'name',
  })
  async getRoleByName(@Query('name') name: string) {
    return this.msAuth
      .send(MsAuthQuery.GetRoleByName, name)
      .pipe(catchRpcException());
  }

  @Get('get-role-by-id/:id')
  @ApiQuery({
    type: String,
    required: true,
    name: 'id',
  })
  async getRoleById(@Query('id', ParseUUIDPipe) id: string) {
    return this.msAuth
      .send(MsAuthQuery.GetRoleById, id)
      .pipe(catchRpcException());
  }

  @Post('search-roles')
  @ApiBody({
    type: () => SearchRolesModel,
    required: true,
  })
  async searchRoles(@Body() model: SearchRolesModel) {
    return this.msAuth
      .send(MsAuthQuery.SearchRoles, model)
      .pipe(catchRpcException());
  }

  @Post('find-roles')
  @ApiBody({
    type: () => FindRolesModel,
    required: true,
  })
  async findRoles(@Body() model: FindRolesModel) {
    return this.msAuth
      .send(MsAuthQuery.SearchRoles, model)
      .pipe(catchRpcException());
  }

  @Post('create-role')
  @ApiBody({
    type: () => CreateRoleModel,
    required: true,
  })
  @AllowPermissions(ApiPermissions.RoleManager)
  async createRole(@Body() model: CreateRoleModel) {
    return this.msAuth
      .send(MsAuthCommand.CreateRole, model)
      .pipe(catchRpcException());
  }

  @Post('update-role/:id')
  @ApiQueryId()
  @ApiBody({
    type: () => UpdateRoleModel,
    required: true,
  })
  @AllowPermissions(ApiPermissions.RoleManager)
  async updateRole(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() model: UpdateRoleModel,
  ) {
    return this.msAuth
      .send(MsAuthCommand.UpdateRole, model)
      .pipe(catchRpcException());
  }

  @Post('delete-role/:id')
  @ApiQueryId()
  @AllowPermissions(ApiPermissions.RoleManager)
  async deleteRole(@Query('id', ParseUUIDPipe) id: string) {
    return this.msAuth
      .send(MsAuthCommand.DeleteRole, id)
      .pipe(catchRpcException());
  }

  //--------------------Permission
  @Get('get-permission-by-name/:name')
  @ApiQuery({
    type: String,
    required: true,
    name: 'name',
  })
  async getPermissionByName(@Query('name') name: string) {
    return this.msAuth
      .send(MsAuthQuery.GetPermissionByName, name)
      .pipe(catchRpcException());
  }

  @Get('get-permission-by-id/:id')
  @ApiQueryId()
  async getPermissionById(@Query('id', ParseUUIDPipe) id: string) {
    return this.msAuth
      .send(MsAuthQuery.GetPermissionById, id)
      .pipe(catchRpcException());
  }

  @Post('search-permissions')
  @ApiBody({
    type: SearchPermissionsModel,
    required: true,
  })
  async searchPermissions(@Body() model: SearchPermissionsModel) {
    return this.msAuth
      .send(MsAuthQuery.SearchPermissions, model)
      .pipe(catchRpcException());
  }

  @Post('find-permissions')
  @ApiBody({
    type: FindPermissionsModel,
    required: true,
  })
  async findPermissions(@Body() model: FindPermissionsModel) {
    return this.msAuth
      .send(MsAuthQuery.FindPermissions, model)
      .pipe(catchRpcException());
  }

  @Post('create-permission')
  @ApiBody({
    type: CreatePermissionModel,
    required: true,
  })
  @AllowPermissions(ApiPermissions.PermissionManager)
  async createPermission(@Body() model: CreatePermissionModel) {
    return this.msAuth
      .send(MsAuthCommand.CreatePermission, model)
      .pipe(catchRpcException());
  }

  @Post('update-permission')
  @ApiBody({
    type: UpdatePermissionModel,
    required: true,
  })
  @ApiQueryId()
  @AllowPermissions(ApiPermissions.PermissionManager)
  async updatePermission(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() model: UpdatePermissionModel,
  ) {
    return this.msAuth
      .send(MsAuthCommand.UpdatePermission, { id, model })
      .pipe(catchRpcException());
  }

  @Delete('delete-permission')
  @ApiQueryId()
  @AllowPermissions(ApiPermissions.PermissionManager)
  async deletePermission(@Query('id', ParseUUIDPipe) id: string) {
    return this.msAuth
      .send(MsAuthCommand.DeletePermission, id)
      .pipe(catchRpcException());
  }


}
