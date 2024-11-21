import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class MoveFileStoreModel {
	@ApiProperty({
		type: UUID,
		name: "parentId",
		required: true,
		nullable: false,
	})
	@IsUUID()
	@IsNotEmpty()
	parentId: string;
}
