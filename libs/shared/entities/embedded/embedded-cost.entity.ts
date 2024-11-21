import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class EmbeddedCostEntity {
  constructor(cost?: Partial<EmbeddedCostEntity>) {
    if (cost) {
      this.pretaxValue = cost.pretaxValue || 0;
      this.taxRate = cost.taxRate || 0;
      this.taxValue = cost.taxValue || 0;
      this.value = cost.value || 0;
    }
  }

  @Column('integer', {
    name: 'TaxRate',
    default: 0,
    nullable: false,
  })
  @ApiProperty()
  /**Tỷ lệ thuế */
  taxRate: number;

  @Column('float', {
    name: 'PretaxValue',
    default: 0,
    nullable: false,
  })
  @ApiProperty()
  /**Thành tiền làm tròn trước thuế */
  pretaxValue: number;

  @Column('float', {
    name: 'TaxValue',
    default: 0,
    nullable: false,
  })
  @ApiProperty()
  /**Giá trị làm tròn thuế */
  taxValue: number;

  @Column('float', {
    name: 'Value',
    default: 0,
    nullable: false,
  })
  @ApiProperty()
  /**Giá trị làm tròn cuối(sau thuế) */
  value: number;
}
