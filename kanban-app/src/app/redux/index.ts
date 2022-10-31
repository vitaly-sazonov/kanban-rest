import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StateConfirm } from './reducers/confirm.reducer';
import { StateNotification } from './reducers/notification.reducer';
import { StateUser } from './reducers/user.reducer';

export interface State {
  notification?: StateNotification;
  confirmation?: StateConfirm;
  userState?: StateUser;
}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
