import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class AttachmentModel {
  @ApiProperty({
    type: UUID,
    description: 'Id tập tin đính kèm',
  })
  @IsUUID('all', {
    message: 'Mã tập tin đính kèm phải là dạng UUID',
  })
  @IsNotEmpty({
    message: 'Id tập tin đính kèm không được để trống',
  })
  /**FileId tập tin */
  id: string;

  @ApiPropertyOptional({
    description: 'Tên hiển thị của tập tin đính kèm',
  })
  /**Tên tập tin */
  name?: string;
}
