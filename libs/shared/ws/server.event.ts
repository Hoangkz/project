export enum ServerEvent {
  ListNotifications = "ListNotifications",
  NotificationEmptied = 'NotificationEmptied',
  NotificationDeleted = 'NotificationDeleted',
  HaveNewNotification = 'HaveNewNotification',
  NotificationRead = 'NotificationRead',
  NotificationReadAll = 'NotificationReadAll',

  HaveNewChatMessage = 'HaveNewChatMessage',
  HaveNewNotificationMessage = 'HaveNewNotificationMessage',
  MessageDeleted = 'MessageDeleted',

  MessageRecalled = 'MessageRecalled',
  MessageSent = 'MessageSent',
  MessageReceived = 'MessageReceived',
  MessageRead = 'MessageRead',
  UserOffline = 'UserOffline',
  UserOnline = 'UserOnline',

  UpdateProcess = 'UpdateProcess',

  HaveQueueLog = 'HaveQueueLog',
  QueueProcessComplete = 'QueueProcessComplete'
}
