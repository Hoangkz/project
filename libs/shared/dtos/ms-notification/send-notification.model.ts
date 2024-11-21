import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UserGroupType } from "libs/shared/constants/user-group.type";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class BaseNotificationModel {
	@IsNotEmpty({
		message: "Tiêu đề không được để trống"
	})
	@ApiProperty({
		description: "Tiêu đề thông báo",
		nullable: false,
		required: true,
	})
	subject: string;

	@IsOptional()
	attachmentName?: string;

	@IsOptional()
	attachmentId?: string

	@IsNotEmpty({
		message: "Nội dung không được để trống"
	})
	@ApiProperty({
		description: "Nội dung thông báo",
		nullable: false,
		required: true,
	})
	content: string;

	@ApiProperty({
		description: "Cho phép gửi đồng thời email",
		nullable: true,
		required: false,
		default: false,
		type: Boolean
	})
	@IsOptional()
	includedMail?: boolean;

	@ApiPropertyOptional({
		description: "Cho phép gửi đồng thời tin nhắn",
		nullable: true,
		required: false,
		default: false,
		type: Boolean
	})
	@IsOptional()
	includedMessage?: boolean;
}

export class SendNotificationToUserModel extends BaseNotificationModel {
	senderId?: string

	receiverId: string;
}

export class SendNotificationToUsersModel extends BaseNotificationModel {
	@IsString({
		message: "ID Người gửi là dạng chữ",
	})
	@IsOptional()
	@ApiProperty({
		description: "ID Người gửi",
		nullable: true,
		required: false,
	})
	senderId?: string;

	@IsArray({
		message: "ID Người nhận chưa đúng định dạng",
	})
	@IsNotEmpty({
		message: "ID Người nhận không được để trống",
	})
	@ApiProperty({
		description: "ID Người nhận",
		type: UUID,
		isArray: true,
		nullable: false,
		required: true
	})
	receiverIds: string[];
}

export class SendNotificationToAllModel extends OmitType(SendNotificationToUserModel, ['receiverId']) {

}

export class SendNotificationToGroupModel extends OmitType(SendNotificationToUserModel, ['receiverId']) {
	@ApiProperty({
		required: true,
		nullable: false,
		type: UUID
	})
	@IsNotEmpty()
	@IsUUID()
	groupId: string

	@ApiProperty({
		required: true,
		nullable: false,
		enum: UserGroupType,
		enumName: "UserGroupType"
	})
	@IsEnum(UserGroupType)
	groupType: UserGroupType
}
