import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { BaseSearchModel } from 'libs/shared/base/base-pagination.model';
import { FindUsersModel } from './find-users.model';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class SearchUserResourcesModel extends IntersectionType(
  BaseSearchModel,
  FindUsersModel,
) {
  @ApiPropertyOptional({
    type: UUID,
    nullable: true,
  })
  resourceId?: string;

  @ApiPropertyOptional({
    type: UUID,
    nullable: true,
  })
  userId?: string;

  @ApiPropertyOptional({
    nullable: true,
    required: false,
    maxLength: 50,
  })
  roles?: string[];

  @ApiPropertyOptional({
    nullable: true,
    required: false,
    maxLength: 50,
  })
  resourceType?: string;

  @ApiPropertyOptional({
    nullable: true,
    required: false,
    maxLength: 50,
  })
  name?: string;
}
