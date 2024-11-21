import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class UserLoginModel {

    @ApiProperty({
        nullable: false,
        required: true,
        maxLength: 100,
        type: () => String,
        name: 'loginName'
    })
    @Length(3, 100, {
        message: 'Tên đăng nhập từ 3 tới 100 ký tự'
    })
    loginName: string;


    @ApiProperty({
        nullable: false,
        required: true,
        type: () => String
    })
    @Length(6, 100, {
        message: "Mật khẩu từ 6 tới 100 ký tự"
    })
    password?: string
}