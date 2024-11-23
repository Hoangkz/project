import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, isNotEmpty } from 'class-validator';
import { authenticate } from 'ldap-authentication';
import { ApiPermissions } from 'libs/permissions';
import { UserGroupType } from 'libs/shared/constants/user-group.type';
import { MsOrganizationQuery } from 'libs/shared/cqrs/query/ms-organization.query';
import { AddUserResourceModel } from 'libs/shared/dtos/ms-auth/add-user-resource.model';
import { AddUserResourcesModel } from 'libs/shared/dtos/ms-auth/add-user-resources.model';
import { ChangeMyPasswordModel } from 'libs/shared/dtos/ms-auth/change-my-password.model';
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
import {
  SetGroupsUserResourcesModel,
  SetGroupUserResourcesModel,
} from 'libs/shared/dtos/ms-auth/set-group-user-resources.model';
import { SetUserRolesModel } from 'libs/shared/dtos/ms-auth/set-user-roles.model';
import { UpdatePermissionModel } from 'libs/shared/dtos/ms-auth/update-permission.model';
import { UpdateResourceModel } from 'libs/shared/dtos/ms-auth/update-resource.model';
import { UpdateRoleModel } from 'libs/shared/dtos/ms-auth/update-role.model';
import { UpdateUserModel } from 'libs/shared/dtos/ms-auth/update-user.model';
import { UserGroup } from 'libs/shared/entities/general/base-user-group.entity';
import { Permission } from 'libs/shared/entities/ms-auth/permission.entity';
import { Role } from 'libs/shared/entities/ms-auth/role.entity';
import { UserAccessLog } from 'libs/shared/entities/ms-auth/user-access-log.entity';
import { UserResource } from 'libs/shared/entities/ms-auth/user-resource.entity';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { Organization } from 'libs/shared/entities/ms-organization/organization.entity';
import { catchMsException } from 'libs/shared/exceptions/ms-exceptions.filter';
import {
  catchRpcDatabasePromise,
  catchRpcException,
  throwRpcError,
} from 'libs/shared/microservice/create-response';
import {
  MS_AUTH,
  MS_ORGANIZATION,
} from 'libs/shared/services';
import { buildSearchOptions } from 'libs/shared/utils/query.util';
import { lastValueFrom } from 'rxjs';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, MS_AUTH)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role, MS_AUTH)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(Permission, MS_AUTH)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(UserResource, MS_AUTH)
    private readonly userResourceRepo: Repository<UserResource>,
    @InjectRepository(UserAccessLog, MS_AUTH)
    private readonly accessLogRepo: Repository<UserAccessLog>,
    @Inject(MS_ORGANIZATION) private readonly organizationService: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.setup();
  }

  async setup() {
    const permissions: Permission[] = Object.keys(ApiPermissions).map((key) => {
      return this.permissionRepo.create({
        name: ApiPermissions[key],
        description: key,
      });
    });
    while (permissions.length > 0) {
      const per = permissions.shift();
      try {
        await per.save();
        console.log(`[PermissionService] Đã khởi tạo quyền ${per.name}`);
      } catch (error) {
        //throw error
      }
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.configService.get('jwtVerifyOptions'),
      );
      const user = await this.getUserById(payload.sub);
      return user;
    } catch (error) {
      return null;
    }
  }

  async getMe(id: string) {
    const user = await this.userRepo.findOneBy({
      id,
    });
    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tồn tại.'));
    }
    return user;
  }

  async getUserById(id: string) {
    let user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tồn tại.'));
    }
    return user;
  }

  async createUser(model: CreateUserModel) {
    let user = await this.userRepo.findOneBy([
      {
        loginName: model.loginName,
      },
      {
        email: model.email,
      },
    ]);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Người dùng đã tồn tại',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const { positionInGroup, ...data } = model;
    user = this.userRepo.create(data);
 
    const roles =
      model.roleIds && model.roleIds?.length > 0
        ? await this.roleRepo.findBy({ id: In(model.roleIds) })
        : [];
    user.roles = roles;
    user = await user.save({
      reload: true,
    });

    if (model.userGroupType === UserGroupType.ORGANIZATION) {
      const organization = await lastValueFrom(
        this.organizationService
          .send(MsOrganizationQuery.GetById, model.userGroupId)
          .pipe(catchRpcException()),
      );
      if (organization) {
        const resources = await lastValueFrom<Organization[]>(
          this.organizationService
            .send(MsOrganizationQuery.FindDescendants, organization.id)
            .pipe(catchRpcException()),
        );
        if (resources) {
          user.resources = await Promise.all(
            resources.map((c) => {
              return this.userResourceRepo
                .create({
                  user,
                  resourceId: c.id,
                  name: c.name,
                  resourceType: 'Organization',
                })
                .save({ reload: true });
            }),
          );
        }
      }
    } 
    return user;
  }

  async changeUserPassword(id: string, password: string) {
    let user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tồn tại.'));
    }
    user.updatePassword(password);
    user = await user.save({ reload: true });

    return user;
  }

  async changeMyPassword(id: string, model: ChangeMyPasswordModel) {
    if (isEmpty(model.password) && isEmpty(model.oldPassword)) {
      throw new NotAcceptableException(
        'Mật khẩu cũ và mật khẩu mới không được đồng thời trống',
      );
    }
    const user = await this.userRepo.findOneBy({
      id,
    });
    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tồn tại'));
    }

    if (!user.compareLocalPassword(model.oldPassword)) {
      throwRpcError(
        new BadRequestException('Mật khẩu hiện tại không chính xác.'),
      );
    }

    user.updatePassword(model.password);
    await user.save();
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tồn tại'));
    }
    try {
      await user.remove().catch(catchRpcDatabasePromise);
      return true;
    } catch (error) {
      throwRpcError(
        new NotAcceptableException(
          'Tài khoản này không thể xóa. Vui lòng sử dụng chức năng khóa tài khoản.',
        ),
      );
    }
  }

  async getUserByLoginName(loginName: string) {
    const user = await this.userRepo.findOneBy({
      loginName,
    });

    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tìm thấy.'));
    }
    return user;
  }

  async forceChangePassword(id: string, password: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tồn tại'));
    }
    user.updatePassword(password);
    await user.save();
    return user;
  }

  async updateUser(id: string, model: UpdateUserModel) {
    let user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tồn tại.'));
    }
    const { positionInGroup, ...data } = model;
    user = this.userRepo.merge(user, data);
  
    if (!user.isAdmin) {
      if (model.userGroupId) {
        if (model.userGroupType === UserGroupType.ORGANIZATION) {
          const organization = await lastValueFrom<Organization>(
            this.organizationService
              .send(MsOrganizationQuery.GetById, model.userGroupId)
              .pipe(catchRpcException()),
          );

        } 
      }
      const roles =
        model?.roleIds?.length > 0
          ? await this.roleRepo.findBy({ id: In(model.roleIds) })
          : [];
      user.roles = roles;
    }

    return await user
      .save({
        reload: true,
      })
      .catch(catchRpcDatabasePromise);
  }

  signToken(userId: string) {
    const payload = {
      sub: userId,
    };
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<number>('jwtExpiration'),
      secret: this.configService.get<string>('jwtSecret'),
    });
  }

  async ldapLogin(username: string, password: string): Promise<boolean> {
    return authenticate({
      ldapOpts: { url: process.env.LDAP_SERVER_URI },
      userDn: `${username}@mobifone.vn`,
      userPassword: `${password}`,
    })
      .catch(() => {
        return false;
      })
      .then((rs: boolean) => {
        return rs;
      });
  }

  async localLogin(loginName: string, password: string) {
    const user = await this.userRepo.findOneBy([
      {
        loginName: loginName,
      },
      {
        email: loginName,
      },
    ]);
    if (!user) {
      throwRpcError(new UnauthorizedException('Tài khoản không tồn tại'));
    }
    if (!user.compareLocalPassword(password)) {
      throwRpcError(new UnauthorizedException('Mật khẩu không chính xác.'));
    }
    return user;
  }

  async login(username: string, password: string) {
    username = username.toLowerCase().replace('@mobifone.vn', '');
    let user: User;
    const isLdapAuthenticated =
      process.env.NODE_ENV === 'dev'
        ? false
        : await this.ldapLogin(username, password);
    if (!isLdapAuthenticated) {
      user = await this.localLogin(username, password);
    } else {
      user = await this.userRepo.findOneBy({
        email: username + '@mobifone.vn',
      });
    }
    if (!user) {
      throwRpcError(new UnauthorizedException('Tài khoản không tồn tại'));
    }
    if (!user.isActived) {
      throwRpcError(new UnauthorizedException('Tài khoản đã bị khóa'));
    }

    delete user.password;
    return user;
  }

  async createUserAccessLog(model: CreateUserAccessLogModel) {
    return await this.accessLogRepo.create(model);
  }

  buildFindUserOptions(model: FindUsersModel) {
    const wheres = [];
    const where: FindOptionsWhere<User> = {};
    if (model.ids) {
      where.id = In(model.ids);
    }
   
    if (model.ids && model.ids.length > 0) {
      where.id = In(model.ids);
    }
    if (model.permission && isNotEmpty(model.permission)) {
      where.roles = {
        permissions: {
          name: model.permission,
        },
      };
    }
    if (model.q && isNotEmpty(model.q.trim())) {
      wheres.push({
        ...where,
        name: Like(`%${model.q}%`),
      });
      wheres.push({
        ...where,
        loginName: Like(`%${model.q}%`),
      });

      wheres.push({
        ...where,
        email: Like(`%${model.q}%`),
      });
    }
    return wheres.length > 0 ? wheres : where;
  }

  async searchUsers(model: SearchUsersModel) {
    const [items, total] = await this.userRepo.findAndCount({
      where: this.buildFindUserOptions(model),
      ...buildSearchOptions(model),
      order: {
        createdAt: {
          direction: 'DESC',
        },
      },
      loadEagerRelations: false,
    });
    return { items, total };
  }

  async findUsers(model: FindUsersModel) {
    return this.userRepo.find({
      where: this.buildFindUserOptions(model),
      loadEagerRelations: false,
    });
  }

  //Role -------------------------------

  buildFindRoleOptions(model: FindRolesModel) {
    const where: FindOptionsWhere<Role> = {};
    if (model.ids && model.ids.length > 0) {
      where.id = In(model.ids);
    }
    if (model.q && isNotEmpty(model.q)) {
      where.name = Like(`%${model.q}%`);
    }
    if (isNotEmpty(model.userGroupType)) {
      where.userGroup = model.userGroupType;
    }
    return where;
  }

  async getRoleById(id: string) {
    return this.roleRepo.findOneBy({
      id,
    });
  }

  async getRoleByName(name: string) {
    return this.roleRepo.findOneBy({ name });
  }

  async findRoles(model: FindRolesModel) {
    return this.roleRepo.find({
      where: this.buildFindRoleOptions(model),
    });
  }

  async searchRoles(model: SearchRolesModel) {
    const [items, total] = await this.roleRepo.findAndCount({
      where: this.buildFindRoleOptions(model),
      ...buildSearchOptions(model),
    });
    return { items, total };
  }

  async createRole(model: CreateRoleModel) {
    const permissions = isNotEmpty(model.permissionIds)
      ? await this.permissionRepo.findBy({
          id: In(model.permissionIds),
        })
      : [];
    const exist = await this.roleRepo.findOneBy({ name: model.name });
    if (exist) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Tên vai trò đã tồn tại',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return await this.roleRepo
      .create({ ...model, permissions })
      .save({
        reload: true,
      })
      .catch(catchRpcDatabasePromise);
  }

  async updateRole(id: string, model: UpdateRoleModel) {
    const role = await this.roleRepo.findOneBy({ id });
    if (!role) {
      throwRpcError(new NotFoundException('Vai trò không tồn tại'));
    }
    const permissions = await this.permissionRepo.findBy({
      id: In(model.permissionIds),
    });
    role.permissions = permissions;
    return await this.roleRepo
      .save(
        this.roleRepo.merge(role, {
          ...model,
        }),
        { reload: true },
      )
      .catch(catchRpcDatabasePromise);
  }

  async duplicateRole(model: DuplicateRoleModel) {
    const role = await this.roleRepo.findOneBy({ id: model.roleId });
    if (!role) {
      throwRpcError(new NotFoundException('Vai trò không tồn tại'));
    }
    return this.roleRepo
      .create({
        name: model.name,
        description: model.description,
        permissions: role.permissions,
      })
      .save({ reload: true })
      .catch(catchRpcDatabasePromise);
  }

  async deleteRole(id: string) {
    const role = await this.roleRepo.findOneBy({ id });
    if (!role) {
      throwRpcError(new NotFoundException('Vai trò không tồn tại'));
    }
    return await role.remove();
  }

  //---------------Permissions
  buildFindPermissionOptions(model: FindPermissionsModel) {
    const where: FindOptionsWhere<Permission> = {};
    if (model.roleIds) {
      where.roles = {
        id: In(model.roleIds),
      };
    }
    if (model.ids && model.ids.length > 0) {
      where.id = In(model.ids);
    }
    if (model.q && isNotEmpty(model.q)) {
      where.name = Like(`%${model.q}%`);
    }
    return where;
  }

  async getPermissionById(id: string) {
    return this.permissionRepo.findOneBy({
      id,
    });
  }

  async getPermissionByName(name: string) {
    return this.permissionRepo.findOneBy({
      name: name,
    });
  }

  async findPermissions(model: FindPermissionsModel) {
    return this.permissionRepo.find({
      where: this.buildFindPermissionOptions(model),
    });
  }

  async searchPermissions(model: SearchPermissionsModel) {
    const [items, total] = await this.permissionRepo.findAndCount({
      where: this.buildFindPermissionOptions(model),
      ...buildSearchOptions(model),
    });
    return {
      items,
      total,
    };
  }

  async createPermission(model: CreatePermissionModel) {
    const permission = await this.permissionRepo.findOneBy({
      name: model.name,
    });
    if (permission) {
      throwRpcError(new ConflictException('Tên quyền đã tồn tại'));
    }
    return this.permissionRepo
      .create(model)
      .save({ reload: true })
      .catch(catchRpcDatabasePromise);
  }

  async updatePermission(id: string, model: UpdatePermissionModel) {
    const permission = await this.permissionRepo.findOneBy({ id });
    if (!permission) {
      throwRpcError(new NotFoundException('Quyền không tồn tại.'));
    }
    return this.permissionRepo
      .merge(permission, model)
      .save({ reload: true })
      .catch(catchRpcDatabasePromise);
  }

  async deletePermission(id: string) {
    const permission = await this.permissionRepo.findOneBy({ id });
    if (!permission) {
      throwRpcError(new NotFoundException('Quyền không tồn tại.'));
    }
    return permission.remove().catch(catchRpcDatabasePromise);
  }

  //-----------UserRoles
  async setUserRoles(id: string, model: SetUserRolesModel) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throwRpcError(new NotFoundException('Tài khoản không tồn tại'));
    }
    const roles =
      model.roleIds.length === 0
        ? []
        : await this.roleRepo.findBy({
            id: In(model.roleIds),
          });

    user.roles = roles;
    return await user.save({ reload: true });
  }

  async addUserResource(id: string, model: AddUserResourceModel) {
    try {
      let user = await this.userRepo.findOneBy({
        id,
      });
      if (!user) {
        throw new NotFoundException('Tài khoản không tồn tại');
      }
      if (
        user.resources.findIndex(
          (c) =>
            c.resourceId === model.resourceId &&
            c.resourceType === model.resourceType,
        ) < 0
      ) {
        user.resources.push(
          this.userResourceRepo.create({
            ...model,
            user,
          }),
        );
        user = await user.save({
          reload: true,
        });
      }
      return user;
    } catch (error) {
      catchMsException(error);
    }
  }

  async addUserResources(id: string, model: AddUserResourcesModel) {
    try {
      const user = await this.userRepo.findOneBy({
        id,
      });
      if (!user) {
        throw new NotFoundException('Tài khoản không tồn tại');
      }
      if (isNotEmpty(model.resources)) {
        const resourcesModel = model.resources.filter(
          (r: AddUserResourceModel) => {
            return (
              user.resources.findIndex((c) => c.id === r.resourceId) === -1
            );
          },
        );
        user.resources.push(
          ...resourcesModel.map((item: AddUserResourceModel) => {
            return this.userResourceRepo.create({
              user,
              resourceId: item.resourceId,
              resourceType: item.resourceType,
              name: item.name,
              role: item.role,
            });
          }),
        );
        await user.save({ reload: true });
      }
      return user;
    } catch (error) {
      catchMsException(error);
    }
  }

  async setUserResources(id: string, model: AddUserResourcesModel) {
    try {
      const user = await this.userRepo.findOneBy({
        id,
      });
      if (!user) {
        throw new NotFoundException('Tài khoản không tồn tại');
      }
      user.resources = model.resources.map((item: AddUserResourceModel) => {
        return this.userResourceRepo.create(item);
      });
      return await user.save({ reload: true });
    } catch (error) {
      catchMsException(error);
    }
  }

  async clearUserResources(id: string) {
    await this.userResourceRepo.delete({
      user: {
        id,
      },
    });
    return this.userRepo.findOneBy({ id });
  }

  async removeUserResource(id: string, resourceId: string) {
    return await this.userResourceRepo.delete({
      user: {
        id,
      },
      resourceId,
    });
  }

  async removeUserResources(id: string, resourceIds: string[]) {
    return await this.userResourceRepo.delete({
      user: {
        id,
      },
      resourceId: In(resourceIds),
    });
  }

  async removeUserResourceByResourceId(resourceId: string) {
    return await this.userResourceRepo.delete(resourceId);
  }

  async removeUserResourcesByType(id: string, resourceType: string) {
    return await this.userResourceRepo.delete({
      user: {
        id,
      },
      resourceType,
    });
  }

  async updateUserResourceName(model: UpdateResourceModel) {
    await this.userResourceRepo.update(
      {
        resourceId: model.resourceId,
      },
      {
        name: model.name,
      },
    );
  }


  async changeUserIsAdmin(id: string): Promise<any> {
    try {
      const user = await this.getUserById(id);
      user.isAdmin = !user.isAdmin;
      return user.save({ reload: true });
    } catch (error) {
      catchMsException(error);
    }
  }

  async changeUserActived(id: string): Promise<any> {
    try {
      const user = await this.getUserById(id);
      user.isActived = !user.isActived;
      return user.save({ reload: true });
    } catch (error) {
      catchMsException(error);
    }
  }

  async setGroupsUserResources(
    id: string,
    model: SetGroupsUserResourcesModel,
  ): Promise<any> {
    const user = await this.getUserById(id);
    const updateTypes = model.groups.map((c) => {
      return c.resourceType;
    });
    await Promise.all(
      updateTypes.map((type) => {
        return this.removeResourceByType(user, type);
      }),
    );
    user.resources = [
      ...user.resources.filter((c) => !updateTypes.includes(c.resourceType)),
      ...model.groups.reduce((a, b) => {
        return [
          ...a,
          b.resources.map((r) => {
            return this.userResourceRepo.create({
              resourceId: r.resourceId,
              name: r.name,
              role: r.role || 'owner',
              resourceType: b.resourceType,
            });
          }),
        ];
      }, []),
    ];

    return user.save({ reload: true });
  }

  async setGroupUserResources(
    id: string,
    model: SetGroupUserResourcesModel,
  ): Promise<any> {
    const user = await this.getUserById(id);

    const otherResources = user.resources.filter(
      (c) => c.resourceType !== model.resourceType,
    );
    const resources = model.resources.map((c) => {
      return this.userResourceRepo.create({
        name: c.name,
        resourceId: c.resourceId,
        resourceType: model.resourceType,
        role: c.role || 'owner',
      });
    });
    await this.removeResourceByType(user, model.resourceType);
    user.resources = [...otherResources, ...resources];
    return user.save({ reload: true });
  }

  async removeResourceByType(user: User, resourceType: string) {
    await this.userResourceRepo.delete({
      user,
      resourceType,
    });
  }

  async searchUserResource(model: SearchUserResourcesModel) {
    const where: FindOptionsWhere<UserResource> = {};
    if (model.resourceId) {
      where.resourceId = model.resourceId;
    }
    if (model.userId) {
      where.userId = model.userId;
    }
    if (!isEmpty(model.roles)) {
      where.role = In([...model.roles]);
    }
    if (model.resourceType) {
      where.resourceType = model.resourceType;
    }
    return this.userResourceRepo.find({
      where,
      relations: {
        user: true,
      },
    });
  }

  async deleteUserResourceOfUser(
    resourceId: string,
    userId: string,
  ): Promise<any> {
    return this.userResourceRepo.delete({
      userId,
      resourceId,
    });
  }
}
