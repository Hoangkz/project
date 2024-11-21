import { Column } from 'typeorm';
import { EmbeddedBaseEntity } from './embedded-base.entity';
import { ApiProperty } from '@nestjs/swagger';

export class EmbeddedErpEntity extends EmbeddedBaseEntity {
  @Column('nvarchar', {
    nullable: false,
    name: 'ErpName',
  })
  @ApiProperty()
  erpName: string;

  @Column('varchar', {
    nullable: false,
    name: 'ErpId',
  })
  @ApiProperty()
  erpId: string;
}
