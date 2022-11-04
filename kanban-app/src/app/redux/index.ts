import { StateBoards } from './reducers/boards.reducers';
import { StateConfirm } from './reducers/confirm.reducer';
import { StateModal } from './reducers/modal.reducer';
import { StateNotification } from './reducers/notification.reducer';
import { StateUser } from './reducers/user.reducer';

export interface State {
  modal?: StateModal;
  notification?: StateNotification;
  confirmation?: StateConfirm;
  userBoards?: StateBoards;
  userState?: StateUser;
}
