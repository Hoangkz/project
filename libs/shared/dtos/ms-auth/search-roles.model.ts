import { IntersectionType } from "@nestjs/swagger";
import { BaseSearchModel } from "libs/shared/base/base-pagination.model";
import { FindRolesModel } from "./find-roles.model";

export class SearchRolesModel extends IntersectionType(FindRolesModel, BaseSearchModel){

}