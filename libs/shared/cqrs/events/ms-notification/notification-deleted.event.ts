
export class NotificationDeletedEvent {
    constructor(public readonly receiverId: string, public readonly id: string){}
}