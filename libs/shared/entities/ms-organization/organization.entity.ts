import { ApiProperty } from '@nestjs/swagger';
import { BaseIdentityEntity } from 'libs/shared/base/base-identity.entity';
import {
  OrganizationLevel,
  OrganizationType,
} from 'libs/shared/constants/organization.type';
import {
  Column,
  Entity,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { OrganizationMeta } from './organization-meta.entity';

@Entity('Organization')
@Tree('materialized-path')
export class Organization extends BaseIdentityEntity {
  @Column('nvarchar', {
    length: 255,
    name: 'Name',
  })
  name: string;

  @Column('varchar', {
    name: 'Code',
    length: 50,
    nullable: false,
  })
  @ApiProperty()
  code: string;

  @Column('varchar', {
    name: 'Alias',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  alias: string;

  @Column('varchar', {
    name: 'ErpId',
    length: 50,
    nullable: false,
    unique: true,
  })
  @ApiProperty()
  erpName: string;

  @TreeChildren({
    cascade: true,
  })
  @ApiProperty()
  children: Organization[];

  @TreeParent()
  @ApiProperty()
  parent?: Organization;

  @Column({ nullable: true })
  parentId?: string;

  @Column('varchar', {
    name: 'Type',
    nullable: false,
    default: OrganizationType.DEFAULT,
  })
  type: OrganizationType;

  @Column('varchar', {
    name: 'level',
    nullable: true,
    default: OrganizationLevel.City,
  })
  level: OrganizationLevel = OrganizationLevel.City;

  @Column('bit', {
    name: 'allow-select',
    default: true,
    nullable: false,
  })
  allowSelect: boolean;

  @Column('bit', {
    nullable: false,
    default: true,
    name: 'IsActive',
  })
  @ApiProperty()
  isActive: boolean;

  @OneToMany(() => OrganizationMeta, (meta) => meta.owner, {
    eager: true,
    cascade: true,
  })
  @ApiProperty()
  metadata?: OrganizationMeta[];

  async updateParent(newParent) {
    const treeRepo =
      Organization.getRepository().manager.getTreeRepository(Organization);
    const descendantColumn =
      treeRepo.metadata.closureJunctionTable.descendantColumns[0].databasePath;
    const ancestorColumn =
      treeRepo.metadata.closureJunctionTable.ancestorColumns[0].databasePath;
    const closureTableName = treeRepo.metadata.closureJunctionTable.tablePath;
    const ancestorReferencedColumn =
      treeRepo.metadata.closureJunctionTable.ancestorColumns[0].referencedColumn
        .databasePath;
    const parentPropertyName =
      treeRepo.metadata.treeParentRelation.propertyName;

    let currentParentId;
    try {
      const result = await treeRepo
        .createQueryBuilder()
        .select([descendantColumn, ancestorColumn])
        .from(closureTableName, closureTableName)
        .where(`${descendantColumn} = :descendantId`, {
          descendantId: this[ancestorReferencedColumn],
        })
        .andWhere(`${ancestorColumn} <> :descendantId`)
        .execute();

      if (result && result[0]) currentParentId = result[0][ancestorColumn];
    } catch (e) {}

    if (!currentParentId && newParent) {
      // insert into closure table
      await treeRepo
        .createQueryBuilder()
        .insert()
        .into(closureTableName, [ancestorColumn, descendantColumn])
        .values({
          [ancestorColumn]: {
            [ancestorReferencedColumn]: newParent[ancestorReferencedColumn],
          },
          [descendantColumn]: {
            [ancestorReferencedColumn]: this[ancestorReferencedColumn],
          },
        })
        .execute();

      this[parentPropertyName] = newParent;
    }

    if (
      currentParentId &&
      newParent &&
      currentParentId !== newParent[ancestorReferencedColumn]
    ) {
      // update parent in closure table
      await treeRepo
        .createQueryBuilder()
        .update(closureTableName)
        .set({
          [ancestorColumn]: {
            [ancestorReferencedColumn]: newParent[ancestorReferencedColumn],
          },
        })
        .where(`${descendantColumn} = :descendantId`, {
          descendantId: this[ancestorReferencedColumn],
        })
        .andWhere(`${ancestorColumn} = :ancestorId`, {
          ancestorId: currentParentId,
        })
        .execute();

      this[parentPropertyName] = newParent;
    }

    if (!newParent && currentParentId) {
      // delete parent
      await treeRepo
        .createQueryBuilder()
        .delete()
        .from(closureTableName)
        .where(`${descendantColumn} = :descendantId`, {
          descendantId: this[ancestorReferencedColumn],
        })
        .andWhere(`${ancestorColumn} = :ancestorId`, {
          ancestorId: currentParentId,
        })
        .execute();

      this[parentPropertyName] = null;
    }

    return await treeRepo.save(this, {
      reload: true,
    });
  }
}
