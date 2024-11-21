import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseFindModel } from 'libs/shared/base/base-pagination.model';
import {
  OrganizationLevel,
  OrganizationType,
} from 'libs/shared/constants/organization.type';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class GetOrganizationModel {
  @ApiProperty({
    name: 'code',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  code?: string;

  @ApiProperty({
    name: 'erpName',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  erpName?: string;

  @ApiPropertyOptional({
    name: 'level',
    enum: OrganizationLevel,
    enumName: 'OrganizationLevel',
  })
  @IsOptional()
  level?: OrganizationLevel;

  @ApiProperty({
    enum: OrganizationType,
    enumName: 'OrganizationType',
    required: false,
    nullable: true,
  })
  @IsOptional()
  type?: OrganizationType;

  @ApiProperty({
    name: 'alias',
    type: String,
    nullable: true,
    required: false,
  })
  @IsOptional()
  alias?: string;
}
