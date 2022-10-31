import { createReducer, on } from '@ngrx/store';
import { State } from '..';
import {
  addConfirmMessage,
  addConfirmResult,
  deleteConfirmMessage,
  deleteConfirmResult,
} from '../actions/confirm.actions';
export interface StateConfirm {
  message: string;
  result: boolean | null;
}

export const initialState: State = {
  confirmation: {
    message: '',
    result: null,
  },
};

export const confirmationReducer = createReducer(
  initialState,
  on(
    addConfirmMessage,
    (state, { message }): State => ({
      ...state,
      confirmation: { message, result: null },
    })
  ),
  on(
    deleteConfirmMessage,
    (state, {}): State => ({
      ...state,
      confirmation: { message: '', result: null },
    })
  ),
  on(
    addConfirmResult,
    (state, { result }): State => ({
      ...state,
      confirmation: { message: '', result },
    })
  ),
  on(
    deleteConfirmResult,
    (state, {}): State => ({
      ...state,
      confirmation: { message: '', result: null },
    })
  )
);
