import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, Length } from "class-validator";
import { OrganizationType } from "libs/shared/constants/organization.type";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class CreateOrganizationModel {
	@ApiProperty({
		type: String,
		required: true,
	})
	@IsNotEmpty({
		message: "Tên phòng ban không được để trống",
	})
	@Length(2, 255, {
		message: "Tên phòng ban từ 2-255 ký tự",
	})
	name: string;

	@ApiProperty({
		type: String,
		required: true,
	})
	@IsNotEmpty({
		message: "Mã phòng ban không được để trống",
	})
	@Length(1, 20, {
		message: "Mã phòng ban từ 1-20 ký tự",
	})
	code: string;

	@ApiProperty({
		type: String,
		required: true,
	})
	@IsNotEmpty({
		message: "ERPName phòng ban không được để trống",
	})
	@Length(1, 20, {
		message: "ERPName từ 1-20 ký tự",
	})
	erpName: string;

	@ApiProperty({
		type: OrganizationType,
		enum: OrganizationType,
		required: true,
	})
	@IsEnum(OrganizationType)
	type: OrganizationType;

	@ApiProperty({
		type: UUID,
		required: false,
	})
	parentId?: string;
}
