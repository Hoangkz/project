import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

/** Đây là lớp thực thể nhúng, sử dụng lớp này với những thông tin bảo lãnh hợp đồng */
export class EmbeddedGuaranteeEntity {
  @Column('nvarchar', {
    name: 'Type',
    length: 255,
    nullable: true,
  })
  @ApiProperty()
  /**Hình thức đảm bảo hợp đồng */
  type: string;

  @Column({
    name: 'Rate',
    nullable: true,
    default: 0,
    type: Number,
  })
  @ApiProperty()
  /**Tỷ lệ đảm bảo/bảo lãnh hợp đồng */
  rate: number;

  @Column({
    name: 'Value',
    nullable: true,
    default: 0,
    type: Number,
  })
  @ApiProperty()
  /**Tổng giá trị đảm bảo/bảo lãnh hợp đồng */
  value: number;

  @Column({
    name: 'SubmitTime',
    nullable: true,
    default: 0,
    type: Number,
  })
  @ApiProperty()
  /**Ngày nộp đảm bảo/bảo lãnh hợp đồng tính từ ngày ký hợp đồng */
  submitTime: number;

  @Column({
    name: 'ValidityTime',
    nullable: true,
    default: 0,
    type: Number,
  })
  @ApiProperty()
  /**Thời gian hiệu lực/thực hiện đảm bảo/bảo lãnh hợp đồng */
  validityTime: number;
}
