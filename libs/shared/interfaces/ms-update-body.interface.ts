import {
  CreateTermModel,
  UpdateTermModel,
} from '../base/create-taxonomy.model';

export interface IUpdateBody<TModel> {
  id: string;
  model: TModel;
}

export interface ICreateTermModel {
  taxAlias: string;
  model: CreateTermModel;
}

export interface IUpdateTaxModel {
  taxAlias: string;
  model: UpdateTermModel;
}
