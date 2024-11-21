import { Injectable, mixin, NestInterceptor, Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { randomUUID } from "crypto";
import fs from "fs";
import { diskStorage } from "multer";
import path, { extname } from "path";

interface ImportFileInterceptorOptions {
	fieldName: string;
	namespace: string;
	fileFilter?: MulterOptions["fileFilter"];
	limits?: MulterOptions["limits"];
	root?: boolean;
}
export default function ImportFileIntercepter(
	options: ImportFileInterceptorOptions,
): Type<NestInterceptor> {
	@Injectable()
	class Interceptor implements NestInterceptor {
		fileInterceptor: NestInterceptor;
		constructor(configService: ConfigService) {
			const fileDestination = path.resolve(
				configService.get("uploadFolder"),
				"imports",
				options.namespace,
			);
			if (!fs.existsSync(fileDestination)) {
				fs.mkdirSync(fileDestination, {
					recursive: true,
				});
			}

			const multerOptions: MulterOptions = {
				storage: diskStorage({
					destination: async (req, file, cb) => {
						cb(null, fileDestination); // thư mục để lưu file
					},
					filename: (req, file, cb) => {
						const extension = extname(file.originalname);
						const fileName = `${randomUUID()}${extension}`;
						cb(null, fileName);
					},
				}),
				fileFilter: options.fileFilter,
				limits: {
					fileSize: configService.get("maxFileSize"),
				},
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
