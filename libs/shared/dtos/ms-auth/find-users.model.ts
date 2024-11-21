import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApiPermissionTypes } from 'libs/permissions';
import { BaseFindModel } from 'libs/shared/base/base-pagination.model';
import { UserGroupType } from 'libs/shared/constants/user-group.type';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class FindUsersModel extends BaseFindModel {
  @ApiPropertyOptional({
    nullable: true,
    required: false,
    maxLength: 50,
  })
  q?: string;

  @ApiPropertyOptional({
    type: UUID,
    nullable: true,
  })
  userGroupId?: string;

  @ApiPropertyOptional({
    enum: UserGroupType,
    enumName: 'UserGroupType',
    nullable: true,
  })
  userGroupType?: UserGroupType;

  @ApiPropertyOptional({
    type: String,
    nullable: true,
  })
  positionGroupAlias?: string;

  @ApiPropertyOptional({
    type: [String],
    nullable: true,
  })
  positionGroupAliases?: string[];

  @ApiPropertyOptional({
    type: Boolean,
    nullable: true,
  })
  positionIsLeader?: boolean;

  @ApiPropertyOptional({
    type: String,
    name: 'permission',
    nullable: true,
  })
  permission?: ApiPermissionTypes;
}
