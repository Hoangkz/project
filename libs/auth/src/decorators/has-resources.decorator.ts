import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetResourceIdFunc, ResourceGuard } from '../guards/resource.guard';
interface ResourceGuardOptions<TBody> {
  role?: string | string[];
  func: GetResourceIdFunc<TBody>;
}
export function HasResources<TBody = any>(
  ...options: ResourceGuardOptions<TBody>[]
) {
  return applyDecorators(
    UseGuards(
      JwtAuthGuard,
      ...options.map((opts) => new ResourceGuard<TBody>(opts.func, opts.role)),
    ),
  );
}
