import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryResultDto } from 'libs/shared/base/base-query-result.dto';
import { MetadataResult } from 'libs/shared/base/metadata.result';
import { UserGroupType } from 'libs/shared/constants/user-group.type';
import { UserGroup } from 'libs/shared/entities/general/base-user-group.entity';
import { PermissionResult } from './permission.result';
import { RoleResult } from './role.result';
import { UserResourceResult } from './user-resource.result';
import { EmbeddedEmployeePositionEntity } from 'libs/shared/entities/embedded/embedded-employee-position.entity';

export class UserResult extends BaseQueryResultDto {
  @ApiProperty({
    type: String,
    nullable: false,
  })
  /**
   * Tên hiển thị
   */
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    name: 'loginName',
  })
  /**
   * Tên đăng nhập
   */
  loginName: string;

  @ApiProperty({
    type: Boolean,
    name: 'isActived',
  })
  /**Trạng thái user */
  isActived: boolean;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  /**Địa chỉ email */
  email: string;

  @ApiProperty({
    type: () => RoleResult,
    isArray: true,
  })
  roles: RoleResult[];

  @ApiProperty({
    type: PermissionResult,
    isArray: true,
  })
  permissions: PermissionResult[];

  @ApiProperty({
    type: () => UserResourceResult,
    isArray: true,
    default: [],
    nullable: false,
  })
  resources: UserResourceResult[];

  @ApiProperty({
    type: Object,
  })
  metadata: MetadataResult[];

  @ApiProperty({
    nullable: true,
    enum: UserGroupType,
    enumName: 'UserGroupType',
  })
  userGroupType?: UserGroupType;

  @ApiProperty({
    nullable: true,
  })
  positionInGroup?: EmbeddedEmployeePositionEntity;

  @ApiProperty({
    nullable: true,
    type: () => UserGroup,
  })
  userGroup?: UserGroup;
}
