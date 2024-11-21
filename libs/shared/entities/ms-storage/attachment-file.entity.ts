import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

/** Đây là lớp thực thể nhúng, sử dụng lớp này nếu các thực thể khác có quan hệ 1-1 tới tập tin đính kèm */
export class AttachmentFile {
  @Column('varchar', {
    length: 255,
    nullable: true,
    name: 'AttachmentFileId',
  })
  @ApiProperty()
  /**FileId tập tin */
  id: string;

  @Column('nvarchar', {
    length: 255,
    name: 'AttachmentName',
    nullable: true,
  })
  @ApiProperty()
  /**Tên tập tin, cập nhật tên này mỗi khi thay đổi fileId */
  name?: string;
}
