import { IntersectionType } from "@nestjs/swagger";
import { BaseSearchModel } from "libs/shared/base/base-pagination.model";
import { FindPermissionsModel } from "./find-permissions.model";

export class SearchPermissionsModel extends IntersectionType(FindPermissionsModel, BaseSearchModel) {

}