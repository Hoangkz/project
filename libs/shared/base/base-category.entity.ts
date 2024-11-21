import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
import { toAlias } from "../utils/alias.util";
import { BaseIdentityEntity } from "./base-identity.entity";

export abstract class BaseCategoryEntity extends BaseIdentityEntity {
	@Column("int", {
		default: 0,
		nullable: true,
		name: "OrderNumber",
	})
	/**Thứ tự sắp xếp */
	orderNumber: number;

	@Column("ntext", {
		nullable: true,
		name: "Description",
	})
	/**Mô tả về danh mục */
	description?: string;

	@Column("nvarchar", {
		length: 255,
		nullable: false,
		name: "Name",
	})
	@ApiProperty({
		type: String
	})
	name: string;

	@Column("varchar", {
		length: 255,
		nullable: true,
		name: "Alias",
	})
	@ApiPropertyOptional({
		type: String
	})
	alias?: string;

	@BeforeUpdate()
	@BeforeInsert()
	updateAlias() {
		this.alias = toAlias(this.name).toUpperCase();
	}
}
