import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Đây là lớp thực thể nhúng, sử dụng lớp này nếu các thực thể khác có quan hệ 1-1 tới tập tin đính kèm */
export class AttachmentFileResult {
  @ApiProperty()
  /**FileId tập tin */
  id: string;

  @ApiPropertyOptional()
  /**Tên tập tin, cập nhật tên này mỗi khi thay đổi fileId */
  name?: string;
}
