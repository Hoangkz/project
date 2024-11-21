import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

/** Đây là lớp thực thể nhúng, sử dụng lớp này nếu các thực thể khác có quan hệ 1-1 tới tập tin đính kèm */
export class EmbeddedProgramEntity {
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
  year?: number;
}
