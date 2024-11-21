import { ApiProperty } from '@nestjs/swagger';
import { AttachmentColumn } from 'libs/shared/decorators/typeorm/embedded-attachment.decorator';
import { Column } from 'typeorm';
import { EmbeddedAttachmentEntity } from './embedded-attachment.entity';

export class EmbeddedDecisionEntity {
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
    name: 'Code',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  code?: string;

  @Column('int', {
    name: 'Year',
    nullable: true,
  })
  @ApiProperty()
  /**Năm hiệu lực */
  year?: number;

  @Column('datetime', {
    name: 'EffectiveDate',
    nullable: true,
  })
  @ApiProperty()
  /**Ngày có hiệu lực */
  effectiveDate?: Date;

  @Column('datetime', {
    nullable: true,
    name: 'SignedDate',
  })
  @ApiProperty()
  /**Ngày ký quyết định */
  signedDate: Date;

  /**Quyết định */
  @AttachmentColumn('attachment')
  @ApiProperty()
  attachmentFile: EmbeddedAttachmentEntity;

  @Column('nvarchar', {
    name: 'position',
    nullable: true,
  })
  @ApiProperty()
  /** Chức vụ người ký */
  position: string;

  @Column('nvarchar', {
    name: 'SignerName',
    length: 100,
    nullable: true,
  })
  @ApiProperty()
  /**Tên người ký quyết định */
  signerName: string;
}
