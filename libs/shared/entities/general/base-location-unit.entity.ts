import { Column } from "typeorm";

export class BaseLocationUnit {
    @Column("uniqueidentifier", {
		name: 'Id',
		nullable: false
	})
	id: string


	@Column("nvarchar", {
		name: "ShortName",
		nullable: false,
		length: 255,
	})
	shortName: string;

	@Column("nvarchar", {
		name: "Code",
		nullable: false,
		length: 10,
	})
	/** Mã địa phương, VD: 00101 */
	code: string;

	@Column("nvarchar", {
		name: "Level",
		nullable: false,
		length: 20,
	})
	/**Cấp địa phương, VD: Thành phố */
	level: string;

	@Column("nvarchar", {
		name: "FullName",
		nullable: false,
		length: 255,
	})
	/**
	 * Tên đầy đủ, VD: Thành phố Hà Nội
	 */
	fullName: string;
}