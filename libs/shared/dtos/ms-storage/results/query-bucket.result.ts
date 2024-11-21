import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { BaseQueryResultDto } from "libs/shared/base/base-query-result.dto";
import { QueryFileItemResult } from "./query-file-item.result";

@Exclude()
export class QueryBucketResult extends BaseQueryResultDto {
	@ApiProperty()
	@Expose()
	name: string;

	@ApiProperty()
	@Expose()
	alias: string;

	@ApiProperty()
	@Expose()
	files: QueryFileItemResult[];

	@ApiProperty()
	@Expose()
	parent?: QueryBucketResult;

	@ApiProperty()
	@Expose()
	children: QueryBucketResult[];
}
