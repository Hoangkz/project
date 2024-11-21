import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseQueryResultDto } from 'libs/shared/base/base-query-result.dto';
import { SettingKeys } from 'libs/shared/constants/ms-setting';
import { User } from 'libs/shared/entities/ms-auth/user.entity';
import { QueryNotificationTemplateResult } from './notification-template.result';

@Exclude()
export class QueryNotificationResult extends BaseQueryResultDto {
  @Expose()
  @ApiProperty({
    description: 'Date gửi thông báo',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Người gửi thông báo',
  })
  sender: User;

  @Expose()
  @ApiProperty({
    description: 'Người nhận thông báo',
  })
  receiver: User;

  @Expose()
  @ApiProperty({
    description: 'Mẫu thông báo',
  })
  template: QueryNotificationTemplateResult;

  @Expose()
  @ApiProperty({
    description: 'Dữ liệu của thông báo',
  })
  data: string;

  @Expose()
  @ApiProperty({
    description: 'Đã đọc',
  })
  unRead: boolean;

  @Expose()
  @ApiProperty({
    description: '',
    nullable: true,
    required: true,
  })
  objectType: SettingKeys;
}
