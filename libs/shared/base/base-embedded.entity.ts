import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class BaseEmbeddedEntity {
  @Column('uniqueidentifier', {
    nullable: true,
    name: 'Id',
  })
  @ApiProperty({
    nullable: false,
  })
  id: string;

  @Column('nvarchar', {
    length: 100,
    nullable: true,
    name: 'Name',
  })
  @ApiProperty({
    nullable: false,
  })
  name: string;

  @Column('nvarchar', {
    length: 100,
    nullable: true,
    name: 'Code',
  })
  @ApiProperty({
    nullable: true,
  })
  code?: string;
}
