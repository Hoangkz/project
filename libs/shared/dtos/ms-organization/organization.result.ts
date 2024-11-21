import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseQueryResultDto } from 'libs/shared/base/base-query-result.dto';
import { OrganizationType } from 'libs/shared/constants/ms-organization.enum';
import { OrganizationLevel } from 'libs/shared/constants/organization.type';

@Exclude()
export class OrganizationResult extends BaseQueryResultDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  erpName: string;

  @ApiProperty()
  @Expose()
  erpId: string;

  @ApiProperty()
  @Expose()
  alias: string;

  @ApiProperty()
  @Expose()
  isActive: boolean;

  @ApiProperty({
    type: OrganizationType,
    enum: OrganizationType,
  })
  @Expose()
  type: OrganizationType;

  @ApiProperty()
  @Expose()
  parent?: OrganizationResult;

  @ApiProperty()
  @Expose()
  parentId?: string;

  @ApiProperty({
    type: () => OrganizationResult,
    isArray: true,
  })
  @Expose()
  children: OrganizationResult[] = [];

  @ApiProperty({
    enum: OrganizationLevel,
    enumName: 'OrganizationLevel',
    nullable: false,
  })
  @Expose()
  level: OrganizationLevel;
}
