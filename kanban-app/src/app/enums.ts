export enum QUERY_PARAMS_FIRST {
  signin = '/signin',
  users = '/users',
  signup = '/signup',
  boards = '/boards',
  file = '/file',
  logs = '/logs',
}

export enum QUERY_PARAMS_SECOND {
  columns = '/columns',
  error = '/error',
  info = '/info',
}

export enum NotificationActions{
AddNotification='[Notification] Add Notification',
DeleteNotification='[Notification] Delete Notification',
}

export enum ConfirmActions{
  AddConfirmMessage='[Confirmation] Add Confirm Message',
  DeleteConfirmMessage='[Confirmation] Delete Confirm Message',
  AddConfirmResult='[Confirmation] Add Confirm Result',
  DeleteConfirmResult='[Confirmation] Delete Confirm Result',
}