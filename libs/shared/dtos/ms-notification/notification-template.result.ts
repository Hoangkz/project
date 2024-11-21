import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseQueryResultDto } from 'libs/shared/base/base-query-result.dto';

@Exclude()
export class QueryNotificationTemplateResult extends BaseQueryResultDto {
  @Expose()
  @ApiProperty({
    description: 'Tên mẫu thông báo',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Nội dung mô tả của mẫu thông báo',
  })
  content: string;

  @Expose()
  @ApiProperty({
    description: 'Loại mẫu thông báo',
  })
  subject: string;
}
