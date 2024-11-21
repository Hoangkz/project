import { IntersectionType } from '@nestjs/swagger';
import { BaseSearchModel } from 'libs/shared/base/base-pagination.model';
import { FindOrganizationsModel } from './find-organizations.model';

export class SearchOrganizationModel extends IntersectionType(
  BaseSearchModel,
  FindOrganizationsModel,
) {}
