import { StateConfirm } from "./reducers/confirm.reducer";
import { StateNotification } from "./reducers/notification.reducer";
import { StateUser } from "./reducers/user.reducer";

export interface State {
  notification?: StateNotification;
  confirmation?: StateConfirm;
  userState?: StateUser;
}
