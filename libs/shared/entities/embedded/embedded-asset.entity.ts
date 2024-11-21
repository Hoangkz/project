import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class EmbeddedAssetEntity {
  @Column('nvarchar', {
    length: 255,
    nullable: true,
    name: 'Name',
  })
  @ApiProperty()
  name?: string;

  @Column('nvarchar', {
    length: 255,
    nullable: true,
    name: 'Code',
  })
  @ApiProperty()
  code?: string;

  @Column('uniqueidentifier', {
    nullable: true,
    name: 'Id',
  })
  @ApiProperty()
  id: string;

  @Column('nvarchar', {
    nullable: true,
    name: 'OwnerType',
  })
  ownerType: string;

  @Column('nvarchar', {
    nullable: true,
    name: 'Status',
  })
  status: string;
}
