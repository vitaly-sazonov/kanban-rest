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

export enum NotificationActions {
  AddNotification = '[Notification] Add Notification',
  DeleteNotification = '[Notification] Delete Notification',
}

export enum ConfirmActions {
  AddConfirmMessage = '[Confirmation] Add Confirm Message',
  DeleteConfirmMessage = '[Confirmation] Delete Confirm Message',
  AddConfirmResult = '[Confirmation] Add Confirm Result',
  DeleteConfirmResult = '[Confirmation] Delete Confirm Result',
}
export enum ModalActions{
  SetType='[Modal] Set Type',
  SetVisibility='[Modal] Set Visibility',
}

export enum BoardsActions{
  AddBoard ='[Boards] Add Board',
  DeleteBoardById='[Boards] Delete Board By ID',
  LoadBoards='[Boards] Load Boards',
  LoadBoardById='[Boards] Load Board By ID'
}

export enum ModalTypes{
  ConfirmType,
  FormType
}
