import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class EmbeddedPartnerEntity {
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
    name: 'ShortName',
  })
  @ApiProperty()
  shortName?: string;

  @Column('nvarchar', {
    length: 255,
    nullable: true,
    name: 'Code',
  })
  @ApiProperty()
  code?: string;

  @Column('nvarchar', {
    length: 255,
    nullable: true,
    name: 'ErpId',
  })
  @ApiProperty()
  erpId?: string;

  @Column('nvarchar', {
    length: 255,
    nullable: true,
    name: 'TaxNumber',
  })
  @ApiProperty()
  taxNumber?: string;

  @Column('uniqueidentifier', {
    nullable: true,
    name: 'Id',
  })
  @ApiProperty()
  id?: string;
}
