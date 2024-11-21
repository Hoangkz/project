import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseFindModel } from 'libs/shared/base/base-pagination.model';
import {
  OrganizationLevel,
  OrganizationType,
} from 'libs/shared/constants/organization.type';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class FindOrganizationsModel extends BaseFindModel {
  @ApiPropertyOptional({
    name: 'parentId',
    type: UUID,
    nullable: true,
    required: false,
  })
  @IsOptional()
  parentId?: string;

  @ApiPropertyOptional({
    name: 'level',
    enum: OrganizationLevel,
    enumName: 'OrganizationLevel',
  })
  @IsOptional()
  level?: OrganizationLevel;

  @ApiPropertyOptional({
    name: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({
    name: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  alias?: string;

  @ApiProperty({
    enum: OrganizationType,
    enumName: 'OrganizationType',
    required: false,
    nullable: true,
  })
  @IsOptional()
  type?: OrganizationType;
}
