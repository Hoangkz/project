import { Column, Unique } from 'typeorm';
import { BaseIdentityEntity } from './base-identity.entity';
@Unique(['owner', 'metaKey'])
export abstract class BaseIdentityMetaEntity extends BaseIdentityEntity {
  @Column('nvarchar', {
    length: 255,
    name: 'MetaKey',
    nullable: false,
  })
  metaKey: string;

  @Column('ntext', {
    name: 'MetaValue',
    nullable: true,
  })
  metaValue: string;

  owner?: any;
}
