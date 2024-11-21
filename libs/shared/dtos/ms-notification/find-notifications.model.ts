import { ApiPropertyOptional } from "@nestjs/swagger";
import { BaseFindModel } from "libs/shared/base/base-pagination.model";

export class FindNotificationsModel extends BaseFindModel {
    @ApiPropertyOptional({
        description: "Lọc theo Id người gửi"
    })
    senderId?: string

    receiverId?: string

    @ApiPropertyOptional({
        type: Boolean,
        name: 'readState'
    })
    readState?: boolean
}