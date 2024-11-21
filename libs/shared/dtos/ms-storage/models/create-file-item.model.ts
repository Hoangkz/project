import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { EmbeddedBaseEntity } from 'libs/shared/entities/embedded/embedded-base.entity';

export class CreateFileItemModel {
  @IsOptional()
  @ApiProperty({
    description: 'Đường dẫn tới file',
    nullable: true,
    required: false,
  })
  @IsUUID(undefined, { message: 'Đường dẫn phải là kiểu UUID' })
  bucketId?: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'name',
    type: String,
    nullable: false,
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'contentType',
    type: String,
    nullable: false,
  })
  contentType: string;

  @ApiProperty({
    name: 'proposal',
    type: EmbeddedBaseEntity,
    nullable: true,
  })
  proposal?: EmbeddedBaseEntity;

  @ApiPropertyOptional({
    name: 'metadata',
    type: Object,
    required: false,
  })
  @IsOptional()
  metadata?: [];
}

class BaseFileItemModel extends OmitType(CreateFileItemModel, ['bucketId']) {}

export class CreateFileItemsModel {
  @IsOptional()
  @ApiProperty({
    description: 'Đường dẫn tới file',
    nullable: true,
    required: false,
  })
  @IsUUID(undefined, { message: 'Đường dẫn phải là kiểu UUID' })
  bucketId?: string;

  @ApiProperty({
    type: BaseFileItemModel,
    isArray: true,
    nullable: false,
    required: true,
  })
  files: BaseFileItemModel[];
}
