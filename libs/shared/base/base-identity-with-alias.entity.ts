import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column } from "typeorm";
import { toAlias } from "../utils/alias.util";
import { BaseIdentityEntity } from "./base-identity.entity";

export class BaseIdentityWithNameEntity extends BaseIdentityEntity {
	@Column("nvarchar", {
		length: 255,
		nullable: false,
		name: "Name",
	})
	@ApiProperty()
	name: string;

	@Column("varchar", {
		length: 255,
		nullable: false,
		name: "Alias",
	})
	@ApiProperty()
	alias: string;

	@BeforeInsert()
	@BeforeUpdate()
	updateAlias() {
		if (this.name) {
			this.alias = toAlias(this.name);
		}
	}
}
