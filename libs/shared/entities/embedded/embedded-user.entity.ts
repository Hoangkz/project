import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class EmbeddedUserEntity {
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
    name: 'loginName',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  loginName?: string;

  @Column('nvarchar', {
    name: 'EmployeeName',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  employeeName?: string;
}

export class EmbeddedUsersEntity {
  @Column('simple-array', {
    name: 'Ids',
    nullable: true,
  })
  @ApiProperty()
  ids?: string[];

  @Column('simple-array', {
    name: 'Names',
    nullable: true,
  })
  @ApiProperty()
  names?: string[];

  @Column('simple-array', {
    name: 'LoginNames',
    nullable: true,
  })
  loginNames?: string[];

  @Column('simple-array', {
    name: 'EmployeeNames',
    nullable: true,
  })
  @ApiProperty()
  employeeNames?: string[];
}
