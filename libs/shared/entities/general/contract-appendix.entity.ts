import { ApiProperty } from '@nestjs/swagger';
import { AttachmentColumn } from 'libs/shared/decorators/typeorm/embedded-attachment.decorator';
import { Column } from 'typeorm';
import { EmbeddedAttachmentEntity } from '../embedded/embedded-attachment.entity';

export class ContractAppendix {
  @Column('nvarchar', {
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  name: string;

  @Column('nvarchar', {
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  code: string;

  @AttachmentColumn('attachment')
  @ApiProperty()
  attachment: EmbeddedAttachmentEntity;
}
