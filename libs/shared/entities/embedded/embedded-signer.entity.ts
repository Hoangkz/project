import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class EmbeddedSignerEntity {
  @Column('uniqueidentifier', {
    name: 'Id',
    nullable: true,
  })
  @ApiProperty()
  id?: string;

  @Column('nvarchar', {
    name: 'Name',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  name?: string;

  @Column('nvarchar', {
    name: 'Position',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  position?: string;
}
