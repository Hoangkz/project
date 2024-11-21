export class NotificationsReadEvent {
    constructor(public readonly receiverId: string, public readonly ids: string[]){

    }
}