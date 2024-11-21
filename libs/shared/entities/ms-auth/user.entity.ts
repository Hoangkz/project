import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude, Expose, instanceToPlain } from 'class-transformer';
import { UserGroupType } from 'libs/shared/constants/user-group.type';
import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany
} from 'typeorm';
import { BaseIdentityEntity } from '../../base/base-identity.entity';
import { EmbeddedEmployeePositionEntity } from '../embedded/embedded-employee-position.entity';
import { UserGroup } from '../general/base-user-group.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { UserMeta } from './user-meta.entity';
import { UserResource } from './user-resource.entity';

@Entity('User')
export class User extends BaseIdentityEntity {
  @Column('nvarchar', {
    length: 255,
    name: 'Name',
    nullable: true,
  })
  @ApiProperty({
    type: String,
    nullable: false,
  })
  /**
   * Tên hiển thị
   */
  name: string;

  @Column('nvarchar', {
    length: 64,
    name: 'LoginName',
    nullable: false,
    unique: true,
  })
  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  /**
   * Tên đăng nhập
   */
  loginName: string;

  @Column('nvarchar', {
    length: 64,
    nullable: true,
    name: 'Password',
  })
  /**
   * Mật khẩu đăng nhập hoặc LDAP key
   */
  @Exclude()
  password?: string;

  @Column('bit', {
    name: 'IsActived',
    nullable: false,
    default: true,
  })
  @ApiProperty({
    type: Boolean,
    name: 'isActived',
  })
  /**Trạng thái user */
  isActived: boolean;

  @Column('bit', {
    nullable: false,
    default: false,
    name: 'IsAdmin',
  })
  @ApiProperty()
  isAdmin: boolean;

  @Column('nvarchar', {
    length: 255,
    nullable: false,
    unique: true,
    name: 'Email',
  })
  @ApiProperty()
  /**Địa chỉ email */
  email: string;

  @ManyToMany(() => Role, (ur) => ur.users, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'User_Role',
    joinColumn: {
      name: 'UserId',
      foreignKeyConstraintName: 'FK_User_Role',
    },
    inverseJoinColumn: {
      name: 'RoleId',
      foreignKeyConstraintName: 'FK_Role_User',
    },
  })
  @ApiProperty()
  roles: Role[];

  @OneToMany(() => UserResource, (resource) => resource.user, {
    eager: true,
    cascade: true,
  })
  @ApiProperty()
  resources: UserResource[];

  @Column(() => UserGroup)
  userGroup?: UserGroup;

  @Column('simple-enum', {
    enum: UserGroupType,
    enumName: 'UserGroupType',
    nullable: true,
  })
  userGroupType?: UserGroupType;

  // @Column('uniqueidentifier', {
  //   name: 'PositionInGroup',
  //   nullable: true,
  // })
  @Column(() => EmbeddedEmployeePositionEntity, {
    prefix: 'PositionInGroup',
  })
  positionInGroup?: EmbeddedEmployeePositionEntity;

  @OneToMany(() => UserMeta, (meta) => meta.owner, {
    eager: true,
    cascade: true,
  })
  @ApiProperty()
  metadata: UserMeta[];

  @BeforeInsert()
  checkLocalPasswordInsert() {
    if (this.password) {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
    }
  }

  updatePassword(newPassword: string) {
    if (newPassword) {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(newPassword, salt);
    } else {
      this.password = undefined;
    }
  }

  compareLocalPassword(password: string) {
    if (this.password && password) {
      return bcrypt.compareSync(password, this.password);
    }
    return false;
  }

  @Expose()
  @ApiProperty({
    type: () => Permission,
  })
  permissions: Permission[];

  hasPermissions(...permissionNames: string[]) {
    return this.permissions
      .map((c) => c.name)
      .some((name) => permissionNames.includes(name));
  }

  hasPermission(permissionName: string) {
    return this.permissions.findIndex((c) => c.name === permissionName) > -1;
  }

  @AfterLoad()
  loadResource() {
    const rs = [];
    (this.roles || []).forEach((role) => {
      (role.permissions || []).forEach((perm) => {
        if (rs.findIndex((c) => c.name === perm.name)) {
          rs.push(perm);
        }
      });
    });
    this.permissions = rs;
  }
  toJSON() {
    return instanceToPlain(this);
  }
}
