import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { isEmpty, isNotEmpty } from 'class-validator';
import { isArray } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Sử dụng class interceptor
 */

export class TransformTermAndMetaInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    this.transformRequest(req);

    return next.handle().pipe(
      map((res) => {
        if (!res) return res;
        return this.transformResponse(this.transformMetadata(res));
      }),
    );
  }

  transformResponse(response) {

    if (isArray(response)) {
      return response.map((item) => this.transformResponse(item));
    }
    const keys = Object.keys(response);
    if (
      keys.includes('items') &&
      keys.includes('total') &&
      isArray(response.items)
    ) {
      response.items = response.items.map((item) =>
        this.transformResponse(item),
      );
    }
    return this.transformToClass(response);
  }

  transformToClass(plain: any) {
    if (plain.metadata && isArray(plain.metadata)) {
      const md = plain.metadata;
      plain.metadata = {};
      md.forEach((meta) => {
        if (meta.metaKey) {
          plain.metadata[meta.metaKey] = meta.metaValue;
        }
      });
    }

    if (plain.terms && isArray(plain.terms)) {
      const terms = plain.terms;
      const termModels = {};
      terms.forEach((term) => {
        if (term.taxonomy && term.taxonomy.alias) {
          if (typeof termModels[term.taxonomy.alias] === 'undefined') {
            termModels[term.taxonomy.alias] = [term.alias];
          } else {
            termModels[term.taxonomy.alias].push(term.alias);
          }
        }
      });
      plain.termModels = termModels;
    }
    return plain;
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
      request.body.channels &&
      isArray(request.body.channels) && request.body.channels.length > 0
    ) {
      const channels = request.body.channels
      request.body.channels = channels.map((e: any) => {
        const metadata = e.metadata;
        if (metadata && typeof metadata === "object") {
          return {
            ...e, metadata: Object.keys(metadata)
              .map((metaKey) => {
                return {
                  metaKey,
                  metaValue: metadata[metaKey]?.toString(),
                };
              })
              .filter((c) => isNotEmpty(c.metaValue))
          }
        }
        return e
      })
    }

    if (
      request.body &&
      request.body.channels &&
      isArray(request.body.channels) && request.body.channels.length > 0
    ) {
      const channels = request.body.channels
      request.body.channels = channels.map((e: any) => {
        const termModels = e.termModels;
        const newTermModels = []
        if (termModels && typeof termModels === "object") {
          Object.keys(termModels).forEach((taxAlias) => {
            if (isNotEmpty(termModels[taxAlias])) {
              let termAliases = [];
              if (typeof termModels[taxAlias] === 'string') {
                termAliases = termModels[taxAlias].split(',');
              } else if (isArray(termModels[taxAlias])) {
                termAliases = termModels[taxAlias];
              }
              termAliases.forEach((termAlias) => {
                newTermModels.push({
                  taxAlias,
                  termAlias,
                });
              });
            }
          })
          return {
            ...e, termModels: newTermModels
          }
        }
        return e
      })
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
          if (typeof termModels[taxAlias] === 'string') {
            termAliases = termModels[taxAlias].split(',');
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

  transformMetadata(result) {
    if (result === null || isEmpty(result) || typeof result === 'string') {
      return result;
    }
    Object.keys(result).forEach((key) => {
      const val = result[key];
      if (key === 'metadata' && isArray(val)) {
        result[key] = this.transformMetadataToObject(val)
          ? this.transformMetadataToObject(val)
          : null;
      } else {
        if (typeof val === 'object') {
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
    const result: any = {};
    md.forEach((meta) => {
      if (meta.metaKey && meta.metaValue) {
        result[meta.metaKey] = meta.metaValue;
      }
    });
    return result;
  }
}
