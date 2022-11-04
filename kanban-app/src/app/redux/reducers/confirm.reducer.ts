import { createReducer, on } from '@ngrx/store';
import { ModalTypes } from 'src/app/enums';
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
      modal: { isVisible: true, modalType: ModalTypes.ConfirmType },
    })
  ),
  on(
    deleteConfirmMessage,
    (state, {}): State => ({
      ...state,
      confirmation: { message: '', result: null },
      modal: { isVisible: false },
    })
  ),
  on(
    addConfirmResult,
    (state, { result }): State => ({
      ...state,
      confirmation: { message: '', result },
      modal: { isVisible: false },
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
