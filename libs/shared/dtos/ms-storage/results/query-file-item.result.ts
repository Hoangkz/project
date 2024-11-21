import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { BaseQueryResultDto } from "libs/shared/base/base-query-result.dto";
import { QueryBucketResult } from "./query-bucket.result";

@Exclude()
export class QueryFileItemResult extends BaseQueryResultDto {
	@Expose()
	@ApiProperty({
		description: "Tên file",
	})
	name: string;

	@Expose()
	@ApiProperty({
		description: "Tên file trong thư mục vật lý",
	})
	localFileName: string;

	@Expose()
	@ApiProperty({
		description: "Kiểu nội dung (image/png/doc/...)",
	})
	contentType: string;

	@Expose()
	@ApiProperty({
		description: "Thông tin kho lưu trữ",
	})
	bucket: QueryBucketResult;
}
