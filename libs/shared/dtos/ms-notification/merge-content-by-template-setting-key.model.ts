import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject } from "class-validator";

export class MergeContentByTemplateSettingKeyModel {
	@ApiProperty({
		description: "SettingKey Mẫu thông báo",
        nullable: true,
        required: false
	})
	@IsNotEmpty()
	templateSettingKey: string;

	@ApiProperty({
		description: "Dữ liệu của thông báo",
        nullable: false,
		type: Object
	})
	@IsObject()
	data: any;
}
