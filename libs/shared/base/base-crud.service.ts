import {
  HttpException,
  HttpStatus,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import contentDisposition from 'content-disposition';
import DocxMerger from 'docx-merger';
import Docxtemplater from 'docxtemplater';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { IBaseIdentityEntity } from './base-identity.interface';
import { BaseSearchModel } from './base-pagination.model';
import { PaginationResult } from './pagination.result';

export class BaseCRUDService<EntityClass extends IBaseIdentityEntity> {
  readonly repository: Repository<EntityClass>;
  constructor(primaryRepository: Repository<EntityClass>) {
    this.repository = primaryRepository;
  }

  async create(model: DeepPartial<EntityClass>) {
    const entity: EntityClass = this.repository.create(model);
    try {
      return await this.repository.save(entity, {
        reload: true,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async update(
    id: string,
    model: DeepPartial<EntityClass>,
  ): Promise<EntityClass> {
    const where = { id } as FindOptionsWhere<EntityClass>;
    let entity: any = await this.repository.findOneBy(where);
    if (!entity) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }
    entity = this.repository.merge(entity, model as DeepPartial<EntityClass>);
    return await this.repository.save(entity, { reload: true });
  }

  async createMany(models: DeepPartial<EntityClass>[]): Promise<EntityClass[]> {
    const entities: EntityClass[] = this.repository.create(models);
    try {
      return await this.repository.save(entities, {
        reload: true,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async get(
    optionsWhere: FindOptionsWhere<EntityClass>,
    optionRelations?: FindOptionsRelations<EntityClass> | string[],
  ) {
    return this.repository.findOne({
      where: optionsWhere,
      relations: optionRelations,
    });
  }

  async getOrThrow(
    optionsWhere: FindOptionsWhere<EntityClass>,
    optionRelations?: FindOptionsRelations<EntityClass> | string[],
  ) {
    const entity = await this.repository.findOne({
      where: optionsWhere,
      relations: optionRelations,
    });
    if (!entity) throw new NotFoundException('Không tìm thấy bản ghi phù hợp');
    return entity;
  }

  async find(
    optionsWhere: FindOptionsWhere<EntityClass>,
    optionsOrder?: FindOptionsOrder<EntityClass>,
    optionRelations?: FindOptionsRelations<EntityClass> | string[],
  ) {
    return this.repository.find({
      where: optionsWhere,
      order: optionsOrder,
      relations: optionRelations,
    });
  }

  async paginate(
    optionsWhere:
      | FindOptionsWhere<EntityClass>
      | FindOptionsWhere<EntityClass>[],
    pagination: BaseSearchModel,
    optionRelations?: FindOptionsRelations<EntityClass> | string[],
  ): Promise<PaginationResult> {
    const order: any = {
      createdAt: {
        direction: 'DESC',
      },
    };
    const [items, total] = await this.repository.findAndCount({
      where: optionsWhere,
      skip: (pagination.page - 1) * pagination.size,
      take: pagination.size,
      relations: optionRelations,
      order: order,
    });
    return {
      items,
      total,
    };
  }

  async checkExist(
    optionsWhere: FindOptionsWhere<EntityClass>,
    message: string,
  ) {
    const exist = await this.repository.findOne({
      where: optionsWhere,
    });
    if (exist) throw new NotFoundException(message);
  }

  async delete(optionsWhere: FindOptionsWhere<EntityClass>) {
    const entity = await this.getOrThrow(optionsWhere);
    await this.repository.delete(entity.id);

    return entity;
  }

  async softDelete(optionsWhere: FindOptionsWhere<EntityClass>) {
    const entity = await this.getOrThrow(optionsWhere);
    await this.repository.softDelete(entity.id);
  }

  async hardDeleteMany(arrayIds: string[]) {
    await this.repository.delete(arrayIds);
  }

  async deleteMany(arrayIds: string[]) {
    return await this.repository.softDelete(arrayIds);
  }

  async downloadFileExcelExample(
    folderName: string,
    fileName: string,
    res: Response,
  ) {
    const filePath = path.resolve(
      'uploads/imports',
      folderName,
      fileName + '.xlsx',
    );

    res.set({
      'Content-Length': fs.statSync(filePath).size,
      'Content-Type': 'xlsx',
      'Content-Disposition': contentDisposition(`${fileName}.xlsx`),
    });
    fs.createReadStream(filePath).pipe(res as any);
  }

  async createFileDocx(
    pathFile: string,
    fileName: string,
    data: any,
    outputFile: string,
  ) {
    const content = fs.readFileSync(path.resolve(pathFile, fileName), 'binary');
    const files = data.map((item, index) => {
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      console.log(item)
      doc.render(item);

      const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });

      const output = `output${index}.docx`;
      fs.writeFileSync(path.resolve(pathFile, output), buf);
      const fileItem = fs.readFileSync(
        path.resolve(pathFile, output),
        'binary',
      );
      return fileItem;
    });
    const merger = new DocxMerger({}, files);
    merger.save('nodebuffer', function (data) {
      fs.writeFileSync(path.resolve(pathFile, outputFile), data);
    });
    data.forEach((_, index) => {
      fs.unlinkSync(pathFile + `/output${index}.docx`);
    });

  }

  async downloadFileDocx(pathFile: string, res: Response, outputFile: string) {
    try {
      const filePath = path.resolve(pathFile, outputFile);
      (res as any).set({
        'Content-Length': fs.statSync(filePath).size,
        'Content-Type': 'docx',
        'Content-Disposition': contentDisposition(outputFile),
      });
      fs.createReadStream(filePath).pipe(res as any);
      setTimeout(() => {
        fs.unlinkSync(pathFile + `/${outputFile}`);
      }, 10000);
    } catch (err: any) {
      console.log(err);
    }
  }
}
