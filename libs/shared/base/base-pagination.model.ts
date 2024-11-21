import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export enum OrderType {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class BaseFindModel {
  @ApiPropertyOptional({
    type: String,
    required: false,
    maxLength: 100,
    nullable: true,
  })
  q?: string;

  @ApiPropertyOptional({
    type: UUID,
    isArray: true,
    nullable: true,
    default: [],
  })
  @IsOptional()
  ids?: string[];
}

export class BaseSearchModel {
  @ApiPropertyOptional({
    type: Number,
    name: 'page',
    default: 1,
    required: false,
    nullable: true,
  })
  page: number;

  @ApiPropertyOptional({
    type: Number,
    name: 'size',
    default: 20,
    required: false,
    nullable: true,
  })
  size: number;

  @ApiPropertyOptional({
    name: 'orderBy',
    type: String,
    required: false,
    nullable: true,
  })
  @IsOptional()
  orderBy?: string;

  @ApiPropertyOptional({
    name: 'order',
    enum: OrderType,
    enumName: 'OrderType',
  })
  @IsOptional()
  order?: 'DESC' | 'ASC';
}

export class BaseQuerySearchModel extends IntersectionType(
  BaseFindModel,
  BaseSearchModel,
) {}
