import { createReducer, on } from '@ngrx/store';
import { State } from '.';
import {
  addNotification,
  deleteNotification,
} from '../actions/notification.actions';

export interface StateNotification {
  message: string;
}

export const initialState: State = {
  notification: {
    message: '',
  },
};

export const notificationReducer = createReducer(
  initialState,
  on(
    addNotification,
    (state, { message }): State => ({
      ...state,
      notification: { message },
    })
  ),
  on(
    deleteNotification,
    (state, {}): State => ({
      ...state,
      notification: { message: '' },
    })
  )
);
