import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity, Column,
  CreateDateColumn,
  DeleteDateColumn, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
@Exclude()
export class BaseIdentityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  @ApiHideProperty()
  @Expose()
  id: string;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'datetime',
  })
  @ApiHideProperty()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'datetime' })
  @ApiHideProperty()
  @Exclude()
  updatedAt: Date;

  @ApiHideProperty()
  @Exclude()
  @DeleteDateColumn({
    name: 'deletedAt',
    type: 'datetime',
  })
  deletedAt?: Date;

  @Column({
    name: 'createdByUserId',
    type: 'uniqueidentifier',
    nullable: true,
  })
  createdByUserId?: string;

  @Column({
    name: 'updatedByUserId',
    type: 'uniqueidentifier',
    nullable: true,
  })
  updatedByUserId?: string;
}

export class BaseIdentityEntityWithMeta extends BaseIdentityEntity {

  metadata: any[]

  @ApiProperty({
    name: 'attrs',
    type: Object,
    nullable: true
  })
  @Expose()
  attrs: { [prop: string]: any }

  @AfterLoad()
  convertAttrs() {
    this.attrs = {}
    if (this.metadata) {
      this.metadata.forEach(meta => {
        this.attrs[meta.metaKey] = meta.metaValue
      })
    }

  }
}