import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { StateNotification } from './notification.reducer';
import { StateUser } from './user.reducer';

export interface State {
  notification?: StateNotification;
  userState?: StateUser;
}

export const reducers: ActionReducerMap<State> = {
  
  
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
