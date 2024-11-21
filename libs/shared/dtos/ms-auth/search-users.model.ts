import { IntersectionType } from "@nestjs/swagger";
import { BaseSearchModel } from "libs/shared/base/base-pagination.model";
import { FindUsersModel } from "./find-users.model";

export class SearchUsersModel extends IntersectionType(BaseSearchModel, FindUsersModel) {

}