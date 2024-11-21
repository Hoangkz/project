import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MetadataModel } from "../../general/metadata.model";

export class UpdateFileItemModel {
	@IsNotEmpty({
		message: "Tên file không được để trống",
	})
	@ApiProperty({
		description: "Tên file",
	})
	@IsString({ message: "Tên file phải là kiểu chữ" })
	name: string;

	@ApiPropertyOptional({
		name: "metadata",
		type: Object,
		required: false,
	})
	@IsOptional()
	metadata?: MetadataModel[]
}
