import { ApiProperty } from '@nestjs/swagger';
import { SharedDirectoryType } from 'libs/shared/constants/ms-shared-directory';
import { Column } from 'typeorm';

export class EmbeddedEmployeePositionEntity {
  @Column('uniqueidentifier', {
    name: 'Id',
    nullable: true,
  })
  @ApiProperty()
  id?: string;

  @Column('bit', {
    name: 'IsLeader',
    nullable: true,
    default: false,
  })
  @ApiProperty()
  isLeader?: boolean;

  @Column('nvarchar', {
    name: 'Name',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  name?: string;

  @Column('varchar', {
    name: 'Alias',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  alias?: string;

  @Column('varchar', {
    name: 'Type',
    length: 255,
    nullable: true,
  })
  @ApiProperty({
    enumName: 'SharedDirectoryType',
    enum: SharedDirectoryType,
  })
  type?: SharedDirectoryType;

  @Column('nvarchar', {
    name: 'Description',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  description?: string;
}
