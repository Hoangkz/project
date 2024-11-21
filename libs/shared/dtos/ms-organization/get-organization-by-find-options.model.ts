import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  OrganizationLevel,
  OrganizationType,
} from 'libs/shared/constants/organization.type';

export class GetOrganizationByFindOptionsModel {
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
