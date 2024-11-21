import { ApiProperty } from "@nestjs/swagger"
import { Column } from "typeorm"

export class UserGroup {
	@Column("uniqueidentifier", {
		name: 'UserGroupId',
		nullable: true
	})
	@ApiProperty({
		nullable: false
	})
	id: string

	@Column("nvarchar", {
		name: "UserGroupName",
		length: 255,
		nullable: true
	})
	@ApiProperty({
		nullable: false
	})
	name: string

	@Column("nvarchar", {
		name: "UserGroupCode",
		length: 255,
		nullable: true
	})
	@ApiProperty({
		nullable: true
	})
	code?: string
}