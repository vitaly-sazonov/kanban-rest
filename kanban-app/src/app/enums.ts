export enum QUERY_PARAMS_FIRST {
  signin = '/signin',
  users = '/users',
  signup = '/signup',
  boards = '/boards',
  file = '/file',
  logs = '/logs',
}

export enum Language {
  En = 'en',
  Ru = 'ru',
}

export enum QUERY_PARAMS_SECOND {
  columns = '/columns',
  error = '/error',
  info = '/info',
}

export enum RouterStateValue {
  main = 'main',
  registration = 'registration',
  login = 'login',
  edit = '/edit',
}

export enum PasswordValidatorSymbols {
  upperCase = 'uppercase',
  lowerCase = 'lowercase',
  numbers = 'numbers',
  special = 'special',
  minLength = 'minlength',
  symbol = '*@!#%&()^~{}',
  required = 'required',
  email = 'email',
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
export enum ModalActions {
  SetType = '[Modal] Set Type',
  SetVisibility = '[Modal] Set Visibility',
}

export enum BoardsActions {
  AddBoards = '[Boards] Add Boards',
  AddBoard = '[Boards] Add Board',
  DeleteBoardById = '[Boards] Delete Board By ID',
  LoadBoards = '[Boards] Load Boards',
  LoadBoardById = '[Boards] Load Board By ID',
}

export enum ModalTypes {
  ConfirmType,
  FormType,
}
export enum UserAction {
  login = '[User] Login User',
  logout = '[User] Logout User',
}

export enum LoadingStateAction {
  setTrue = '[State] LoadingState True',
  setFalse = '[State] LoadingState False',
}

export enum ConfirmQuestions {
  DeleteUserQuestion = 'DeleteUserQuestion',
}

export enum PercentSize {
  eighty = '80%',
}
