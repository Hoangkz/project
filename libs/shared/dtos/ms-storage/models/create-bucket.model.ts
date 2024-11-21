import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class CreateBucketModel {
  @ApiProperty({
    description: 'Tên kho lưu trữ',
    required: true,
    nullable: false,
  })
  name: string;

  @IsOptional()
  @ApiProperty({
    name: 'parentId',
    type: UUID,
    required: false,
    nullable: true,
  })
  parentId?: string;

  @ApiPropertyOptional({
    name: 'metadata',
    type: Object,
    required: false,
  })
  @IsOptional()
  metadata?: [];
}
