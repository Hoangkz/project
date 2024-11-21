import { Exclude, Expose } from 'class-transformer';
import { BaseIdentityEntity } from 'libs/shared/base/base-identity.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';

@Exclude()
@Entity('UserResource')
@Unique('U_User_Resource', ['user', 'resourceId'])
export class UserResource extends BaseIdentityEntity {
  @ManyToOne(() => User, (user) => user.resources, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({
    name: 'UserId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_User_Resource',
  })
  @Expose()
  user: User;

  @Column('uniqueidentifier', {
    nullable: true,
    name: 'UserId',
  })
  userId: string;

  @Column('uniqueidentifier', {
    name: 'ResourceId',
    nullable: true,
  })
  @Expose()
  resourceId: string;

  @Column('varchar', {
    name: 'resourceType',
    nullable: true,
  })
  @Expose()
  resourceType: string;

  @Column('nvarchar', {
    name: 'resourceName',
    length: 255,
    nullable: false,
  })
  @Expose()
  name: string;

  @Column('varchar', {
    name: 'Role',
    length: 20,
    nullable: false,
    default: 'owner',
  })
  @Expose()
  role: string;
}
