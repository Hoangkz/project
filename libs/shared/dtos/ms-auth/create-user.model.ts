import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';
import { UserGroupType } from 'libs/shared/constants/user-group.type';
import { MetadataModel } from '../general/metadata.model';

export class CreateUserModel {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Tên đăng nhập không được để trống',
  })
  @Length(4, 255, {
    message: 'Tên từ 4-50 ký tự',
  })
  name: string;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
    name: 'loginName',
    maxLength: 60,
  })
  @IsNotEmpty({
    message: 'Tên đăng nhập không được để trống',
  })
  @Length(4, 32, {
    message: 'Tên đăng nhập từ 4-32 ký tự',
  })
  loginName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  @IsEmail(
    {},
    {
      message: 'Email không đúng định dạng',
    },
  )
  email: string;

  @ApiProperty()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  metadata?: MetadataModel[];

  @ApiProperty({
    enum: UserGroupType,
    enumName: 'UserGroupType',
    required: false,
    nullable: true,
  })
  userGroupType?: UserGroupType;

  @ApiProperty()
  @IsOptional()
  userGroupId?: string;

  @ApiProperty({
    type: String,
    isArray: true,
    name: 'roleIds',
  })
  roleIds: string[];

  @ApiProperty()
  @IsOptional()
  /**Chức vụ trong tổ chức */
  positionInGroup?: string;
}
