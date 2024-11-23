import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Any } from 'typeorm';

export class MetadataModel {
  @ApiProperty({
    type: String,
    nullable: false,
  })
  @IsNotEmpty()
  metaKey: string;

  @ApiPropertyOptional({
    type: Any,
    nullable: true,
    required: false,
  })
  metaValue: any;
}
