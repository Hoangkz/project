import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export abstract class BaseQueryResultDto {
	@Expose()
	@ApiProperty({
		description: "Id bản ghi",
	})
	id: string;
}
