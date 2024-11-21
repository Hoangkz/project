import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class AttachmentFileMongo {
  @Column('varchar', {
    length: 255,
  })
  @ApiProperty()
  /**FileId tập tin */
  id: string;

  @Column('nvarchar', {
    length: 255,
  })
  @ApiProperty()
  name?: string;
}

export class EmbeddedUserColumnMongo {
  @Column('uniqueidentifier', {
    nullable: true,
  })
  @ApiProperty()
  id?: string;

  @Column('nvarchar', {
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  name?: string;

  @Column('nvarchar', {
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  employeeName?: string;
}
