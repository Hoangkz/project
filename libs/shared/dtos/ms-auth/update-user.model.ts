import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserGroupType } from 'libs/shared/constants/user-group.type';
import { MetadataModel } from '../general/metadata.model';

export class UpdateUserModel {
  @ApiProperty({
    required: true,
    type: String,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    name: 'loginName',
    maxLength: 60,
  })
  @IsNotEmpty()
  loginName: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    default: true,
  })
  isActived: boolean = true;

  @ApiProperty({
    type: Boolean,
    required: false,
    default: false,
  })
  isAdmin: boolean = false;

  @ApiProperty({
    required: true,
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: UserGroupType,
    enumName: 'UserGroupType',
    required: false,
    nullable: true,
  })
  userGroupType?: UserGroupType;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  userGroupId?: string;

  @ApiProperty()
  @IsOptional()
  /**Chức vụ trong tổ chức */
  positionInGroup: string;

  @ApiProperty({
    type: Object,
    nullable: true,
    required: false,
    default: {},
  })
  metadata: MetadataModel[];

  @ApiProperty({
    type: String,
    isArray: true,
    name: 'roleIds',
  })
  roleIds: string[];
}
