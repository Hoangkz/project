import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { isEmpty } from "class-validator";
import { isArray } from "lodash";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
/**
 * Sử dụng class interceptor này để chuyển đổi dữ liệu từ lớp thực thể sang lớp result
 */

export declare interface ClassConstructor<T> {
	new (...args: any): T;
}

export class TransformResponseInterceptor<T> implements NestInterceptor<Partial<T>, T> {
	constructor(private readonly resultType: ClassConstructor<T>) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<Partial<T>>,
	): Observable<T> | Promise<Observable<T>> {
		const req = context.switchToHttp().getRequest();

		return next.handle().pipe(
			map((res) => {
				if (!res) return res;
				const rs = this.transformToClass(res);
				return rs;
			}),
		);
	}

	transformToClass(plain: any) {
		if (!plain) {
			return plain;
		}
		if (isArray(plain)) {
			return plain.map((item) => this.transformToClass(item));
		}

		const result = plain
			? plainToInstance(this.resultType, plain, {
					enableImplicitConversion: false,
					excludeExtraneousValues: false,
					exposeDefaultValues: true,
					exposeUnsetFields: false,
			  })
			: plain;
		return this.transformMetadata(result);
	}

	transformMetadata(result) {
		if (result === null || isEmpty(result)) {
			return result;
		}
		Object.keys(result).forEach((key) => {
			const val = result[key];
			if (key === "metadata" && isArray(val)) {
				result[key] = this.transformMetadataToObject(val)
					? this.transformMetadataToObject(val)
					: null;
			} else {
				if (typeof val === "object") {
					result[key] = this.transformMetadata(val);
				} else if (isArray(val)) {
					result[key] = val.map((item) => this.transformMetadata(item));
				} else {
					result[key] = val;
				}
			}
		});

		return result;
	}

	transformMetadataToObject(md: any[]) {
		const metadata: any = {

		};
		md.forEach((meta) => {
			if (meta.metaKey && meta.metaValue) {
				metadata[meta.metaKey] = meta.metaValue;
			}
		});
		return metadata;
	}
}
