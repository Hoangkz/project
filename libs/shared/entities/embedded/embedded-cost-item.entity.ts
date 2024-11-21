import { Column } from 'typeorm';
import { EmbeddedCostEntity } from './embedded-cost.entity';
import { ApiProperty } from '@nestjs/swagger';

export class EmbeddedItemCostEntity extends EmbeddedCostEntity {
  constructor(cost?: Partial<EmbeddedItemCostEntity>) {
    super(cost);
    if (cost) {
      this.quantity = cost.quantity || 0;
      this.unit = cost.unit;
      this.unitPrice = cost.unitPrice || 0;
    }
  }
  @Column('float', {
    name: 'Quantity',
    nullable: false,
    default: 0,
  })
  @ApiProperty()
  /**Số lượng, mặc định 0 */
  quantity: number;

  @Column('nvarchar', {
    name: 'Unit',
    length: 20,
    nullable: true,
  })
  @ApiProperty()
  /**Đơn vị tính */
  unit?: string;

  @Column('float', {
    name: 'UnitPrice',
    default: 0,
    nullable: false,
  })
  @ApiProperty()
  /**Đơn giá làm tròn */
  unitPrice: number;
}
