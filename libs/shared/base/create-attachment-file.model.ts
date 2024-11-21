import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAttachmentFileModel {
  @ApiProperty({
    description: 'FileId tập tin',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  fileId: string;

  @ApiProperty({ description: 'Tên tập tin', required: false, nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Tên tập tin', required: false, nullable: true })
  @IsOptional()
  @IsString()
  fileName?: string;
}
