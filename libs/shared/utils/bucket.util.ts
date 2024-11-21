import { ForbiddenException, NotFoundException } from "@nestjs/common";
import archiver from "archiver";
import { isNotEmpty } from "class-validator";
import { Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { Bucket } from "../entities/ms-storage/bucket.entity";
import { FileItem } from "../entities/ms-storage/file-item.entity";

export function cleanAliasPath(aliasPath: string) {
	return aliasPath
		.split(/[\\\/]/g)
		.map((c) => c.trim())
		.filter((c) => isNotEmpty(c))
		.join("/");
}

export type FileStoreDownloadOptions = {
	rootDirectory: string;
	format: "zip" | "tar";
	level: number;
	storeOnly: boolean;
	includesSubBucket?: boolean;
};

export async function createBucketDownloadstream(
	bucket: Bucket,
	options: FileStoreDownloadOptions,
	res: Response,
) {
	const { rootDirectory, level, storeOnly, format, includesSubBucket } =
		options;
	if (!rootDirectory || !fs.existsSync(path.resolve(rootDirectory))) {
		throw new NotFoundException(`Thư mục lưu trữ tập tin không tồn tại`);
	}
	res.setHeader(
		"Content-Disposition",
		`attachment; filename="${bucket.name}.zip"`,
	);

	const factory = archiver(format, {
		zlib: {
			level: level,
		},
		store: storeOnly,
	});
	factory.pipe(res as any);

	const __appendFile = (file: FileItem, prefix?: string) => {
		const filePath = path.resolve(
			rootDirectory,
			file.bucket.id,
			file.localFileName,
		);
		if (!fs.existsSync(filePath)) {
			throw new ForbiddenException(`Tập tin ${file.name} không tồn tại`);
		}
		factory.append(fs.createReadStream(filePath), {
			name: `${file.name}.${file.extension}`,
			prefix,
		});
	};

	const __appendBucket = (
		bucket: Bucket,
		prefix?: string,
		includesSubBucket?: boolean,
	) => {
		const bucketDir = path.resolve(rootDirectory, bucket.id);
		const newPrefix = (prefix ? prefix + "/" : "") + bucket.name;
		if (!fs.existsSync(bucketDir)) {
			throw new NotFoundException(
				`Thư mục kho lưu trữ ${bucket.name} không tồn tại`,
			);
		}

		bucket.files.forEach((file) => {
			__appendFile(file, newPrefix);
		});
		if (includesSubBucket) {
			bucket.children.forEach((sub) => {
				__appendBucket(sub, newPrefix, includesSubBucket);
			});
		}
	};

	__appendBucket(bucket, null, includesSubBucket);
	await factory.finalize();
}
