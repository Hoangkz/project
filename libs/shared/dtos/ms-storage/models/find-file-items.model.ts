import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BaseFindModel } from "libs/shared/base/base-pagination.model";

export class FindFileItemsModel extends BaseFindModel {

	@ApiProperty({
		name: "contentType",
		description: "Từ khóa tìm kiếm theo kiểu nội dung (img/png/doc/...)",
		nullable: true,
		required: false,
		type: String,
	})
	@IsOptional()
	contentType?: string;

	@ApiPropertyOptional({
		name: "bucketId",
		description: "Id Bucket chứa tập tin",
		nullable: true,
		required: false,
		type: String,
	})
	@IsOptional()
	bucketId?: string;
}
