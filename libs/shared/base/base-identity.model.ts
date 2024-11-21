import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class BaseIdentityModel {
	@IsUUID()
	@IsNotEmpty()
	@ApiProperty({
		required: true,
		type: UUID,
		name: "id",
	})
	id: string;
}
