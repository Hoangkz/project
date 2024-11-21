import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column } from 'typeorm';

export class EmbeddedSiteEntity {
  @Column('uniqueidentifier', {
    name: 'Id',
    nullable: true,
  })
  @ApiProperty()
  @Expose()
  id?: string;

  @Column('nvarchar', {
    name: 'ErpName',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  @Expose()
  erpName?: string;

  @Column('nvarchar', {
    name: 'ErpId',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  @Expose()
  erpId?: string;

  @Column('uniqueidentifier', {
    name: 'OrganizationId',
    nullable: true,
  })
  @ApiProperty()
  @Expose()
  organizationId?: string;

  @ApiProperty()
  @Column('nvarchar', {
    name: 'Status',
    nullable: true,
  })
  @Expose()
  status?: string;
}
