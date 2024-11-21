export enum ClientEvent {
  SearchMessages = "SearchMessages",
  ViewMessage = "ViewMessage",
  SendMessage = 'SendMessage',
  RecallMessage = 'RecallMessage',
  DeleteMessage = 'DeleteMessage',
  MarkAsRead = 'MarkAsRead',
  MarkAsReceived = 'MarkAsReceived',
  MarkAsSent = 'MarkAsSent',
  MarkAsReadAll = 'MarkAsReadAll',

  SearchNotifications = 'SearchNotifications',
  MarkAsReadNotification = 'MarkAsReadNotification',
  MarkAsReadAllNotifications = 'MarkAsReadAllNotifications',
  DeleteNotification = 'DeleteNotification',
  ClearNotifications = 'ClearNotifications'
}
