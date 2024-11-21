import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { CreateOrganizationModel } from "./create-organization.model";

export class UpdateOrganizationModel extends PartialType(
	CreateOrganizationModel,
) {
	@ApiProperty({
		type: UUID,
		required: true,
	})
	@IsUUID("all", {
		message: "Id phòng ban phải là dạng UUID",
	})
	id: string;
}
