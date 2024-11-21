import { Column } from "typeorm";

/** Đây là lớp thực thể nhúng, sử dụng lớp này nếu các thực thể khác có quan hệ 1-1 tới tập tin đính kèm */
export class AttachmentBucket {
	@Column("nvarchar", {
		length: 255,
		name: "AttachmentName",
		nullable: true,
	})
	/**Tên tập tin, cập nhật tên này mỗi khi thay đổi BucketId */
	name?: string;

	@Column("varchar", {
		length: 255,
		nullable: true,
		name: "AttachmentBucketId",
	})
	/**BucketId tập tin */
	bucketId: string;
}
