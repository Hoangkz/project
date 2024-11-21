import {
	HttpException,
	HttpStatus, Inject,
	Injectable,
	mixin,
	NestInterceptor,
	Type
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import path, { extname } from "path";
import { lastValueFrom } from "rxjs";
import { MsStorageCommand } from "../cqrs/commands/ms-storage.command";
import { MsStorageQuery } from "../cqrs/query/ms-storage.query";
import { catchRpcException } from "../microservice/create-response";
import { MS_STORAGE } from "../services";

interface FileStoreInterceptorOptions {
	fieldName: string;
	fileFilter?: MulterOptions["fileFilter"];
	limits?: MulterOptions["limits"];
}

function FileStoreInterceptor(
	options: FileStoreInterceptorOptions,
): Type<NestInterceptor> {
	@Injectable()
	class Interceptor implements NestInterceptor {
		fileInterceptor: NestInterceptor;
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

						const filePath = path.resolve(rootDirectory, bucket.id);
						cb(null, filePath); // thư mục để lưu file
					},
					filename: async (req, file, cb) => {
						const extension = extname(file.originalname);
						const { bucketId } = req.params;
						const fileItem = await lastValueFrom(this.bucketService.send(MsStorageCommand.CreateFileItem, {
							bucketId,
							name: file.originalname,
							contentType: file.mimetype,
						}).pipe(catchRpcException()))
						if (!fileItem) {
							cb(
								new HttpException(
									{
										status: HttpStatus.CONFLICT,
										message: "File đã tồn tại trong thư mục",
									},
									HttpStatus.CONFLICT,
								),
								null,
							);
							return;
						}
						cb(null, `${fileItem.id}${extension}`);
					},
				}),
				fileFilter: options.fileFilter,
				limits: configService.get("maxFileSize"),
			};

			this.fileInterceptor = new (FileInterceptor(
				options.fieldName,
				multerOptions,
			))();
		}

		intercept(...args: Parameters<NestInterceptor["intercept"]>) {
			return this.fileInterceptor.intercept(...args);
		}
	}
	return mixin(Interceptor);
}

export default FileStoreInterceptor;
