import {
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { isArray, isNotEmpty } from 'class-validator';
import {
  DeepPartial,
  FindOptionsRelations,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { catchRpcDatabasePromise } from '../microservice/create-response';
import { toAlias } from '../utils/alias.util';
import { buildSearchOptions } from '../utils/query.util';
import {
  BaseFindModel,
  BaseFindTermModel,
  BaseQuerySearchModel,
} from './base-pagination.model';
import {
  CreateTaxonomyModel,
  CreateTermModel,
  UpdateTaxonomyModel,
  UpdateTermModel,
} from './create-taxonomy.model';
import { ITaxonomyEntity, ITermEntity } from './taxonomy.interface';
import { TermModel } from './term-model';

export interface ISetupTaxData {
  name: string;
  terms: string[];
  multiple?: boolean;
  readOnly?: boolean;
}

export class BaseCRUDTaxonomyService<
  Taxonomy extends ITaxonomyEntity,
  Term extends ITermEntity,
> {
  public taxRepository: Repository<Taxonomy>;
  public termRepository: Repository<Term>;
  protected setupData: ISetupTaxData[];

  constructor(taxRepo: Repository<Taxonomy>, termRepo: Repository<Term>) {
    this.taxRepository = taxRepo;
    this.termRepository = termRepo;
  }

  // khởi tạo taxonomy và term
  async setup() {
    const data = this.setupData || [];
    data.forEach(async (tax) => {
      let taxonomy: Taxonomy = await this.taxRepository.findOneBy({
        alias: toAlias(tax.name),
      } as any);
      if (!taxonomy) {
        taxonomy = await this.taxRepository.save(
          this.taxRepository.create({
            name: tax.name,
            readOnly: tax.readOnly,
            multiple: tax.multiple,
          } as DeepPartial<Taxonomy>),
          { reload: true },
        );
        const terms = tax.terms.map((name) => {
          const t = this.termRepository.create();
          t.name = name;
          t.taxonomy = taxonomy;
          return t;
        });
        await this.termRepository.save(terms);
      }
    });
  }

  async getTax(
    where: FindOptionsWhere<Taxonomy>,
    relations?: FindOptionsRelations<Taxonomy>,
  ) {
    return this.taxRepository.findOne({
      where,
      relations,
    });
  }

  async getTaxById(id: string) {
    return this.taxRepository.findOne({
      where: { id: id as any },
      relations: ['terms'],
    });
  }

  async getTaxByAlias(alias: string) {
    return this.taxRepository.findOne({
      where: { alias: alias as any },
      relations: ['terms'],
    });
  }

  buildFindOptionsWhereTerm(model: BaseFindTermModel) {
    const where: any = {
      taxonomy: {
        alias: Like(`%${toAlias(model.taxAlias)}%`),
      },
    };
    const wheres: any = [];

    if (model.q && isNotEmpty(model.q)) {
      wheres.push({
        ...where,
        name: Like(`%${model.q}%`),
      });
      wheres.push({
        ...where,
        alias: Like(`%${toAlias(model.q)}%`),
      });
    }
    return wheres.length > 0 ? wheres : where;
  }

  buildFindOptionsWhereTaxonomy(model: BaseFindModel) {
    const where: FindOptionsWhere<Taxonomy> = {};
    const wheres: FindOptionsWhere<Taxonomy>[] = [];
    if (model.q && isNotEmpty(model.q)) {
      wheres.push({
        ...where,
        name: Like(`%${model.q}%`),
      });
      wheres.push({
        ...where,
        alias: Like(`%${model.q}%`),
      });
    }
    return wheres.length > 0 ? wheres : where;
  }

  async searchTaxonomies(model: BaseQuerySearchModel) {
    const [items, total] = await this.taxRepository.findAndCount({
      where: this.buildFindOptionsWhereTaxonomy(model),
      ...buildSearchOptions(model),
      relations: ['terms'],
    });
    return { items, total };
  }

  async findTaxonomies(model: BaseFindModel) {
    return await this.taxRepository.find({
      where: this.buildFindOptionsWhereTaxonomy(model),
      relations: ['terms'],
    });
  }

  async getAllTaxonomies() {
    return await this.taxRepository.find();
  }

  async updateTaxonomy(id: string, model: UpdateTaxonomyModel) {
    const where: any = { id };
    const entity = await this.taxRepository.findOneBy(where);
    if (!entity) {
      throw new NotFoundException('Không tìm thấy nhóm phân loại');
    }
    if (entity.alias !== toAlias(model.name)) {
      if (await this.getTaxByAlias(toAlias(model.name))) {
        throw new ConflictException(
          'Đã tồn tại nhóm phân loại trùng bí danh ' + toAlias(model.name),
        );
      }
    }
    return this.taxRepository
      .merge(entity, model as any)
      .save({ reload: true })
      .catch(catchRpcDatabasePromise);
  }

  async createTaxonomy(model: CreateTaxonomyModel) {
    if (await this.getTaxByAlias(toAlias(model.name))) {
      throw new ConflictException(
        'Đã tồn tại nhóm phân loại trùng bí danh ' + toAlias(model.name),
      );
    }
    return this.taxRepository.create(model as DeepPartial<Taxonomy>).save();
  }

  async deleteTaxonomy(id: string) {
    const entity = await this.taxRepository.findOneBy({ id: id as any });
    if (!entity) {
      throw new NotFoundException('Không tồn tại bản ghi nhóm phân loại');
    }
    return entity.remove();
  }

  async deleteTaxonomyByAlias(alias: string) {
    const entity = await this.getTaxByAlias(alias);
    if (!entity) {
      throw new NotFoundException('Không tồn tại bản ghi với bí danh ' + alias);
    }
    return entity.remove();
  }

  /**************
   * TERM
   *
   **************/

  async findTerms(model: BaseFindTermModel) {
    return this.termRepository.find({
      where: this.buildFindOptionsWhereTerm(model),
    });
  }

  async getTermByAlias(taxAlias: string, termAlias: string) {
    const where: any = {
      taxonomy: {
        alias: taxAlias,
      },
      alias: termAlias,
    };
    return this.termRepository.findOne({ where });
  }

  async getTermById(id: string) {
    return this.termRepository.findOne({
      where: {
        id: id as any,
      },
    });
  }

  async createTerm(
    taxAlias: string,
    model: CreateTermModel,
    createTaxonomyIfNotExist?: boolean,
  ) {
    let taxonomy = await this.getTaxByAlias(taxAlias);
    if (!taxonomy) {
      if (!createTaxonomyIfNotExist) {
        throw new NotFoundException(
          'Không tồn tại bản ghi nhóm phân loại với bí danh ' + taxAlias,
        );
      }
      taxonomy = await this.taxRepository
        .create({ name: taxAlias } as DeepPartial<Taxonomy>)
        .save();
    }
    if ((await taxonomy.terms)?.find((c) => c.alias === toAlias(model.name))) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `Nhóm phân loại ${
            taxonomy.name
          } đã tồn tại thuộc tính trùng bí danh ${toAlias(model.name)}`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const termModel: any = {
      name: model.name,
      taxonomy,
      description: model.description,
      metadata: model.metadata,
    };
    return this.termRepository.create(termModel as DeepPartial<Term>).save();
  }

  async updateTerm(id: string, model: UpdateTermModel) {
    const term = await this.getTermById(id);
    if (!term) {
      throw new NotFoundException(
        'Không tìm thấy bản ghi thuộc tính phân loại',
      );
    }
    if (term.alias !== toAlias(model.name)) {
      if (await this.getTermByAlias(term.taxonomy.alias, toAlias(model.name))) {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: `Nhóm phân loại ${
              term.taxonomy.name
            } đã tồn tại thuộc tính trùng bí danh ${toAlias(model.name)}`,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
    return this.termRepository.merge(term, model as any).save({ reload: true });
  }

  async createIfNotExist(taxName: string, termName?: string) {
    const taxWhere: any = {
      alias: toAlias(taxName),
    };
    let tax = await this.taxRepository.findOneBy(taxWhere);
    if (!tax) {
      const model: Taxonomy = {
        name: taxName,
      } as any;
      tax = await this.taxRepository.create(model).save({
        reload: true,
      });
    }
    const termWhere: any = {
      alias: toAlias(termName),
    };
    let term = await this.termRepository.findOneBy(termWhere);
    if (term) {
      const termModel: Term = {
        name: termName,
        taxonomy: tax,
      } as any;
      term = await this.termRepository.create(termModel).save({
        reload: true,
      });
    }
    return term;
  }

  async deleteTermById(id: string) {
    const term = await this.getTermById(id);
    if (!term) {
      throw new NotFoundException('Không tồn tại bản ghi thuộc tính');
    }
    return term.remove();
  }

  async deleteTermByAlias(taxAlias: string, termAlias: string) {
    const term = await this.getTermByAlias(taxAlias, termAlias);
    if (!term) {
      throw new NotFoundException('Không tồn tại bản ghi thuộc tính');
    }
    return term.remove();
  }

  async searchTerms(taxAlias: string, model: BaseQuerySearchModel) {
    const where: any = {
      alias: Like(`%${toAlias(model.q)}%`),
      taxonomy: {
        alias: taxAlias,
      },
    };
    const [items, total] = await this.termRepository.findAndCount({
      where,
      take: model.size,
      skip: (model.page - 1) * model.size,
    });
    return { items, total };
  }

  async getOrCreateTaxonomyIfNotExist(taxAlias: string) {
    let tax = await this.taxRepository.findOneBy({
      alias: taxAlias as any,
    });
    if (!tax) {
      tax = await this.createTaxonomy({
        name: taxAlias,
      });
    }
    return tax;
  }

  async getOrCreateTermsIfNotExist(taxAlias: string, termAlias: string) {
    const tax = await this.getOrCreateTaxonomyIfNotExist(taxAlias);
    let term = await this.getTermByAlias(tax.alias, toAlias(termAlias));
    if (!term) {
      term = await this.createTerm(tax.alias, {
        name: termAlias,
      });
    }
    return term;
  }

  async getTermsFromTermModels(termModels: TermModel[]) {
    if (!termModels || termModels.length <= 0) return;
    const mds = termModels?.reduce((a, b) => {
      if (b.termAlias) {
        const termAliases = isArray(b.termAlias) ? b.termAlias : [b.termAlias];
        termAliases.forEach((termAlias) => {
          if (
            a.findIndex(
              (c) => c.taxAlias === b.taxAlias && c.termAlias === termAlias,
            ) === -1
          ) {
            a.push({
              taxAlias: b.taxAlias,
              termAlias: termAlias,
            });
          }
        });
        return [...a];
      }
    }, []);
    if (!mds) return;
    return await Promise.all(
      mds?.map((termModel) => {
        return this.getOrCreateTermsIfNotExist(
          termModel.taxAlias,
          termModel.termAlias,
        );
      }),
    );
  }
}
