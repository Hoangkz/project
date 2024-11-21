import { Notification } from "libs/shared/entities/ms-notification/notification.entity";

export class NotificationSendEvent {
    constructor(public readonly receiverId: string, public readonly notification:Notification){

    }
}
