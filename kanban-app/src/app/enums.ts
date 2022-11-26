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
  By = 'by',
  Ua = 'ua',
}

export enum QUERY_PARAMS_SECOND {
  columns = '/columns',
  tasks = '/tasks',
  error = '/error',
  info = '/info',
}

export enum QUERY_PARAMS_THIRD {
  tasks = '/tasks',
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
  EditBoardById = '[Boards] Edit Board By Id',
  DeleteBoardById = '[Boards] Delete Board By ID',
  DeleteAllBoards = '[Boards] Delete All Boards',
  LoadBoards = '[Boards] Load Boards',
  LoadBoardById = '[Boards] Load Board By ID',
  RestoreBoard = '[Boards] Restore',
}

export enum ModalTypes {
  ConfirmType,
  FormType,
}

export enum ModalSchemes {
  addBoard = 'addBoard',
  editBoard = 'editBoard',
  addColumn = 'addColumn',
  editColumn = 'editColumn',
  addTask = 'addTask',
  editTask = 'editTask',
}

export enum ColumnActions {
  LoadColumns = '[Columns] Load columns',
  loadDetailedColumns = '[Columns] Load detailed columns',
  AddColumn = '[Columns] Add new column',
  AddColumns = '[Columns] Add columns',
  RemoveColumn = '[Columns] Delete column',
  EditColumn = '[Columns] Edit column',
}

export enum TaskActions {
  LoadTasks = '[Tasks] Load Tasks',
  AddTask = '[Tasks] Add task',
  AddTasks = '[Tasks] Add tasks',
  EditTask = '[Tasks] Edit task',
  RemoveTask = '[Tasks] Remove task',
  MoveTask = '[Tasks] Move task',
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

export enum LocalStorageValues {
  Token = 'token',
  UserId = 'userId',
  Language = 'language',
}
export enum SystemSound {
  delete = 'assets/mp3/delete.mp3',
  notification = 'assets/mp3/notification.mp3',
  success = 'assets/mp3/success.wav',
}
