export enum MsNotificationCommand {
  SendNotificationToUser = 'SendNotificationToUser',
  SendNotificationToUsers = 'SendNotificationToUsers',
  SendNotificationToGroup = 'SendNotificationToGroup',
  SendNotificationToAll = 'SendNotificationToAll',
  MarkAsReadNotification = 'MarkAsReadNotification',
  MarkAsReadAllNotifications = 'MarkAsReadAllNotifications',
  MarkAsReadNotifications = 'MarkAsReadNotifications',
  DeleteNotification = 'DeleteNotification',
  ClearNotificationsByReceiver = 'ClearNotificationsByReceiver',
  DeleteNotificationByReceiver = 'DeleteNotificationByReceiver',
}
