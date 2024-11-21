import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateRoleModel {
  @IsNotEmpty()
  @Length(3, 50)
  @ApiProperty({
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 50,
  })
  name: string;

  @ApiPropertyOptional({
    name: 'description',
    required: false,
    nullable: true,
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    name: 'permissionIds',
    type: Array<String>,
    nullable: true,
    required: false,
  })
  permissionIds: string[];
}
