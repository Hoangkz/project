import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";
//Giảm trừ hạng mục - Payment
export class EmbeddedDeduction {
    @Column('float', {
        name: 'Quantity',
        nullable: false,
        default: 0,
    })
    @ApiProperty()
    /**Số lượng, sau giảm trừ*/
    quantity: number;

    @Column('float', {
        name: 'UnitPrice',
        default: 0,
        nullable: false,
    })
    @ApiProperty()
    /**Đơn giá làm tròn */
    unitPrice: number;

    @Column('float', {
        name: 'Value',
        default: 0,
        nullable: false,
    })
    @ApiProperty()
    /**Giá trị làm tròn cuối(sau thuế) */
    value: number;

    @Column('ntext', {
        name: 'Reason',
        nullable: true,
    })
    @ApiProperty()
    /**Lí do giảm trừ */
    reason: string;
}