import { ApiProperty } from "@nestjs/swagger";
import { BaseIdentityEntity } from "libs/shared/base/base-identity.entity";
import { toAlias } from "libs/shared/utils/alias.util";
import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column
} from "typeorm";

export abstract class BaseTermEntity
	extends BaseIdentityEntity
{
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

	@Column("ntext", {
		name: "Description",
		nullable: true,
	})
	description?: string;

	taxonomy: any;

	taxAlias: string;
	taxName: string;

	metadata: any[];

	@BeforeUpdate()
	@BeforeInsert()
	updateAlias() {
		this.alias = toAlias(this.name).toUpperCase();
	}

	@AfterLoad()
	transform() {
		this.taxAlias = this.taxonomy?.alias;
		this.taxName = this.taxonomy?.name;
	}
}
