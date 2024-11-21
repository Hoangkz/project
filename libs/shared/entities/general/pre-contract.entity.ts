import { ApiProperty } from '@nestjs/swagger';
import { ContractType } from 'libs/shared/constants/ms-vc-contract.enum';
import { ContractorPlanType } from 'libs/shared/constants/ms-vc-project.enum';
import { CostColumn } from 'libs/shared/decorators/typeorm/cost-column.decorator';
import { VersionColumn } from 'libs/shared/decorators/typeorm/version-column.decorator';
import { Column } from 'typeorm';
import { EmbeddedCostEntity } from '../embedded/embedded-cost.entity';

/**
 * Lưu thông tin loại hợp đồng và thời gian thực hiện hợp đồng
 */
export class PreContract {
  @Column('integer', {
    name: 'PerformanceDays',
    nullable: true,
  })
  @ApiProperty()
  /**Thời gian thực hiện hợp đồng*/
  performanceDays?: number;

  @Column('datetime2', {
    name: 'startDate',
    nullable: true,
  })
  @ApiProperty()
  /**Thời gian bắt đầu thực hiện LCNT*/
  startDate?: Date;

  @Column('varchar', {
    nullable: true,
    default: ContractType.PACKAGE,
  })
  @ApiProperty({
    enum: ContractType,
    enumName: 'ContractType',
    nullable: true,
  })
  /**Loại hợp đồng */
  contractType?: ContractType;

  @Column('varchar', {
    default: ContractorPlanType.CHI_DINH_NHA_CUNG_CAP,
    name: 'contractorPlanType',
  })
  /**Hình thức lựa chọn nhà thầu */
  contractorPlanType: ContractorPlanType;

  @CostColumn('bidCost')
  bidCost?: EmbeddedCostEntity;

  @VersionColumn()
  version: number;
}
