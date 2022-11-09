export enum QUERY_PARAMS_FIRST {
  signin = '/signin',
  users = '/users',
  signup = '/signup',
  boards = '/boards',
  file = '/file',
  logs = '/logs',
  columns = '/columns',
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
  edit = 'edit',
  welcome = 'welcome',
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
  SetScheme = '[Modal] Set Scheme',
  SetVisibility = '[Modal] Set Visibility',
}

export enum BoardsActions {
  AddBoards = '[Boards] Add Boards',
  AddBoard = '[Boards] Add Board',
  AddCurentBoardId = '[Boards] Add Current Board Id',
  DeleteBoardById = '[Boards] Delete Board By ID',
  DeleteAllBoards = '[Boards] Delete All Boards',
  LoadBoards = '[Boards] Load Boards',
  LoadBoardById = '[Boards] Load Board By ID',
}

export enum ModalTypes {
  ConfirmType,
  FormType,
}

export enum ModalSchemes {
  addBoard = 'addBoard',
  addColumn = 'addColumn',
  editColumn = 'editColumn',
  addTask = 'addTask',
}

export enum ColumnActions {
  LoadColumns = '[Columns] Load columns',
  AddColumn = '[Columns] Add new column',
  AddColumns = '[Columns] Add columns',
  RemoveColumn = '[Columns] Delete column',
  EditColumn = '[Columns] Edit column',
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
  fifty = '50%',
}
