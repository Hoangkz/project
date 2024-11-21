import {
	Inject,
	Injectable,
	mixin,
	NestInterceptor,
	Type
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { FilesInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import fs from "fs";
import { diskStorage } from "multer";
import path, { extname } from "path";
import { lastValueFrom } from "rxjs";
import { MsStorageCommand } from "../cqrs/commands/ms-storage.command";
import { MsStorageQuery } from "../cqrs/query/ms-storage.query";
import { catchRpcException } from "../microservice/create-response";
import { MS_STORAGE } from "../services";

interface FileStoresInterceptorOptions {
	fieldName: string;
	maxCount?: number;
	fileFilter?: MulterOptions["fileFilter"];
	limits?: MulterOptions["limits"];
}

function FileStoresInterceptor(
	options: FileStoresInterceptorOptions,
): Type<NestInterceptor> {
	@Injectable()
	class Interceptor implements NestInterceptor {
		filesInterceptor: NestInterceptor;
		constructor(
			configService: ConfigService,
			@Inject(MS_STORAGE) private readonly bucketService: ClientProxy,
		) {
			const rootDirectory = configService.get("fileStoreDirectory");
			const multerOptions: MulterOptions = {
				storage: diskStorage({
					destination: async (req, file, cb) => {
						const { bucketId } = req.params;
						const bucket = await lastValueFrom(this.bucketService.send(MsStorageQuery.GetBucketById, bucketId).pipe(catchRpcException()));
						if (!bucket) {
							cb(new Error("Kho lưu trữ không tồn tại"), null);
							return;
						}
						const dirPath = path.resolve(rootDirectory, bucketId);
						if (!fs.existsSync(dirPath)) {
							fs.mkdirSync(dirPath, {
								recursive: true,
							});
						}
						cb(null, dirPath); // thư mục để lưu file
					},
					filename: async (req, file, cb) => {
						file.originalname = Buffer.from(
							file.originalname,
							"latin1",
						).toString("utf-8");
						const extension = extname(file.originalname);
						const { bucketId } = req.params;
						try {
							const fileItem = await lastValueFrom(this.bucketService.send(MsStorageCommand.CreateFileItem, {
								bucketId,
								name: file.originalname,
								contentType: file.mimetype,
							}).pipe(catchRpcException()))
							cb(null, `${fileItem.id}${extension}`);
						} catch (error) {
							cb(
								new Error("Không thể khởi tạo tập tin " + file.originalname),
								null,
							);
						}
					},
				}),
				fileFilter: options.fileFilter,
				limits: configService.get("maxFileSize"),
			};

			this.filesInterceptor = new (FilesInterceptor(
				options.fieldName,
				options.maxCount || 10,
				multerOptions,
			))();
		}

		intercept(...args: Parameters<NestInterceptor["intercept"]>) {
			return this.filesInterceptor.intercept(...args);
		}
	}
	return mixin(Interceptor);
}

export default FileStoresInterceptor;
