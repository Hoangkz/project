import { ApiProperty } from '@nestjs/swagger';
import { AssetType } from 'libs/shared/constants/ms-asset.enum';
import { CostCatalog } from 'libs/shared/constants/ms-cost.enum';
import { Column } from 'typeorm';

export class EmbeddedAssetCategoryEntity {
  @Column('nvarchar', {
    length: 255,
    nullable: true,
    name: 'Name',
  })
  @ApiProperty()
  name?: string;

  @Column('uniqueidentifier', {
    nullable: true,
    name: 'Id',
  })
  @ApiProperty()
  id: string;

  @Column('nvarchar', {
    length: 20,
    name: 'Code',
    nullable: true,
  })
  @ApiProperty()
  /**Mã danh mục tài sản */
  code: string;

  @Column('varchar', {
    length: 10,
    name: 'Type',
    nullable: true,
  })
  @ApiProperty()
  /**Loại tài sản/công cụ dụng cụ */
  type: AssetType;

  @Column('varchar', {
    name: 'CostCatalog',
    nullable: true,
  })
  costCatalog?: CostCatalog;
}
