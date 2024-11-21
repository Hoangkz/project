import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject } from "class-validator";

export class MergeContentByTemplateIdModel {
	@ApiProperty({
		description: "Template Id Mẫu thông báo",
        nullable: true,
        required: false
	})
	@IsNotEmpty()
	templateId: string;

	@ApiProperty({
		description: "Dữ liệu của thông báo",
        nullable: false,
		type: Object
	})
	@IsObject()
	data: any;
}
