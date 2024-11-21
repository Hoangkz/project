import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseIdentityEntity } from 'libs/shared/base/base-identity.entity';
import { toAlias } from 'libs/shared/utils/alias.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Bucket } from './bucket.entity';
import { FileItemMeta } from './file-item-meta.entity';
import { EmbeddedBaseEntity } from '../embedded/embedded-base.entity';

@Entity('FileItem')
@Exclude()
export class FileItem extends BaseIdentityEntity {
  @Column('nvarchar', {
    name: 'Name',
    nullable: false,
    length: 255,
  })
  @Expose()
  @ApiProperty()
  /**Tên file hiển thị */
  name: string;

  @Column('nvarchar', {
    name: 'Alias',
    nullable: false,
    length: 255,
  })
  @Expose()
  @ApiProperty()
  alias?: string;

  @Column('nvarchar', {
    name: 'path',
    nullable: false,
    length: 1000,
    unique: true,
  })
  @Expose()
  @ApiProperty()
  path: string;

  @Column('nvarchar', {
    name: 'Extension',
    nullable: false,
    length: 50,
  })
  @Expose()
  @ApiProperty()
  extension: string;

  @Column('nvarchar', {
    name: 'ContentType',
    nullable: false,
    length: 255,
  })
  @Expose()
  @ApiProperty()
  /**Kiểu nội dung, VD image/png */
  contentType: string;

  @ManyToOne(() => Bucket, (bk) => bk.files, {
    orphanedRowAction: 'delete',
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'BucketId',
    referencedColumnName: 'id',
  })
  /**Thông tin kho lưu trữ */
  bucket: Bucket;

  @OneToMany(() => FileItemMeta, (meta) => meta.owner, {
    cascade: true,
    eager: true,
  })
  metadata: FileItemMeta[];

  @Column(() => EmbeddedBaseEntity, {
    prefix: 'proposal',
  })
  proposal: EmbeddedBaseEntity;

  @BeforeInsert()
  @BeforeUpdate()
  generateAlias() {
    this.alias = toAlias(this.name);
    this.path = [this.bucket.path, this.alias].join('/');
  }

  get localFileName() {
    return this.id + this.extension;
  }
}
