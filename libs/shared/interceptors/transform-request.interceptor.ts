import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { isNotEmpty } from "class-validator";
import { isArray } from "lodash";
import { Observable } from "rxjs";
/**
 * Sử dụng class interceptor này để chuyển đổi dữ liệu từ lớp thực thể sang lớp result
 */

export declare interface ClassConstructor<T> {
	new (...args: any): T;
}

export class TransformRequestInterceptor implements NestInterceptor {
	constructor() {}

	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<any> | Promise<Observable<any>> {
		const req = context.switchToHttp().getRequest();
		this.transformRequest(req);
		return next.handle()
	}

	transformRequest(request: any) {
		if (
			request.body &&
			request.body.metadata &&
			!isArray(request.body.metadata)
		) {
			const metadata = request.body.metadata;
			request.body.metadata = Object.keys(metadata)
				.map((metaKey) => {
					return {
						metaKey,
						metaValue: metadata[metaKey]?.toString(),
					};
				})
				.filter((c) => isNotEmpty(c.metaValue));
		}
		if (
			request.body &&
			request.body.termModels &&
			!isArray(request.body.termModels)
		) {
			const termModels = request.body.termModels;
			request.body.termModels = [];
			Object.keys(termModels).forEach((taxAlias) => {
				if (isNotEmpty(termModels[taxAlias])) {
					let termAliases = [];
					if (typeof termModels[taxAlias] === "string") {
						termAliases = termModels[taxAlias].split(",");
					} else if (isArray(termModels[taxAlias])) {
						termAliases = termModels[taxAlias];
					}
					termAliases.forEach((termAlias) => {
						request.body.termModels.push({
							taxAlias,
							termAlias,
						});
					});
				}
			});
		}

		if (
			request.body &&
			request.body.termModels &&
			!isArray(request.body.termModels)
		) {
			const termModels = request.body.termModels;
			request.body.termModels = [];
			Object.keys(termModels).forEach((taxAlias) => {
				if (isNotEmpty(termModels[taxAlias])) {
					let termAliases = [];
					if (typeof termModels[taxAlias] === "string") {
						termAliases = termModels[taxAlias].split(",");
					} else if (isArray(termModels[taxAlias])) {
						termAliases = termModels[taxAlias];
					}
					termAliases.forEach((termAlias) => {
						request.body.termModels.push({
							taxAlias,
							termAlias,
						});
					});
				}
			});
		}
	}
}
