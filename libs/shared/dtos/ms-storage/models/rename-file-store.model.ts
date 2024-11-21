import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class RenameFileStoreModel {
	@ApiProperty({
		name: "name",
		description: "Tên mới của Bucket",
		required: true,
		nullable: false,
	})
	@IsNotEmpty()
	@Length(1, 255)
	name: string;
}
