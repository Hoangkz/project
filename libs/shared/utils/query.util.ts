import { BaseSearchModel } from '../base/base-pagination.model';

export function buildSearchOptions(options: BaseSearchModel) {
  const order: any = {};
  if (options.orderBy) {
    order[options.orderBy] = options.order || 'ASC';
  }
  const take = options.size || 20;
  const skip = ((options.page || 1) - 1) * take;
  return { order, skip, take };
}
