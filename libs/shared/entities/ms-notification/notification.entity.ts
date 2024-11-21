import { BaseEmbeddedEntity } from 'libs/shared/base/base-embedded.entity';
import { BaseIdentityEntity } from 'libs/shared/base/base-identity.entity';
import { Column, Entity } from 'typeorm';

@Entity('Notification')
export class Notification extends BaseIdentityEntity {
  @Column(() => BaseEmbeddedEntity, {
    prefix: 'Sender',
  })
  sender?: BaseEmbeddedEntity;

  @Column(() => BaseEmbeddedEntity, {
    prefix: 'Receiver',
  })
  receiver?: BaseEmbeddedEntity;

  @Column('nvarchar', {
    length: 255,
    nullable: false,
    name: 'Subject',
  })
  subject: string;

  @Column('ntext', {
    nullable: false,
    name: 'Content',
  })
  content: string;

  // @Column('uniqueidentifier', {
  //   nullable: true,
  //   name: 'AttachmentId'
  // })
  // attachmentId?: string;

  @Column('nvarchar', {
    length: 255,
    nullable: true,
    name: 'AttachmentName',
  })
  attachmentName?: string;

  @Column('bit', {
    name: 'Unread',
    default: true,
    nullable: false,
  })
  unRead: boolean;

  @Column('bit', {
    name: 'IncludedMail',
    nullable: false,
    default: false,
  })
  includedMail?: boolean;

  @Column('bit', {
    name: 'IncludedMessage',
    nullable: false,
    default: false,
  })
  includedMessage?: boolean;
}
