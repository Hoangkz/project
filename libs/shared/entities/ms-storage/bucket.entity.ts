import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { BaseIdentityEntity } from "libs/shared/base/base-identity.entity";
import { toAlias } from "libs/shared/utils/alias.util";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	Tree,
	TreeChildren,
	TreeParent
} from "typeorm";
import { BucketMeta } from "./bucket-meta.entity.ts";
import { FileItem } from "./file-item.entity";

@Entity("Bucket")
@Tree("materialized-path")
@Exclude()
export class Bucket extends BaseIdentityEntity {
	@Column("nvarchar", {
		name: "Name",
		nullable: false,
		length: 255,
	})
	@ApiProperty()
	@Expose()
	name: string;

	@Column("varchar", {
		name: "alias",
		nullable: false,
		length: 255,
		default: "ROOT",
	})
	@ApiProperty()
	@Expose()
	alias: string;

	@Column("varchar", {
		name: "path",
		nullable: false,
		length: 1000,
		unique: true,
	})
	@Expose()
	@ApiProperty()
	path: string;

	@TreeParent()
	parent: Bucket;

	@TreeChildren({
		cascade: true,
	})
	@Expose()
	@ApiProperty({
		type: () => Bucket,
		isArray: true,
		default: [],
		nullable: false,
	})
	children: Bucket[];

	@OneToMany(() => FileItem, (file) => file.bucket, {
		cascade: true,
	})
	@Expose()
	@ApiProperty({
		type: () => FileItem,
		nullable: false,
		default: [],
		isArray: true,
	})
	files: FileItem[];

	@Expose()
	@ApiProperty({
		type: () => Bucket,
		isArray: true,
		nullable: false,
	})
	parents: Bucket[];

	@OneToMany(() => BucketMeta, meta => meta.owner, {
		cascade: true,
		eager: true
	})
	metadata: BucketMeta[];

	@BeforeUpdate()
	@BeforeInsert()
	setAlias() {
		this.alias = toAlias(this.name);
		this.path = this.parent
			? [this.parent.path, this.alias].join("/")
			: this.alias;
	}
}
