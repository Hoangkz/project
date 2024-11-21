import { BaseIdentityEntity } from 'libs/shared/base/base-identity.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('Permission')
export class Permission extends BaseIdentityEntity {
  @Column('nvarchar', {
    name: 'Name',
    length: 255,
    nullable: true,
    unique: true,
  })
  /** route name */
  name: string;

  @Column('ntext', {
    name: 'Description',
    nullable: true,
  })
  /** Tên hiển thị */
  description?: string;

  @ManyToMany(() => Role, (rp) => rp.permissions, {
    onUpdate: 'CASCADE',
  })
  roles: Role[];
}
