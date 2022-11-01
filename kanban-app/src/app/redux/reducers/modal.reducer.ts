import { createReducer, on } from '@ngrx/store';
import {  ModalTypes } from 'src/app/enums';
import { State } from '..';
import { setType, setVisibility } from '../actions/modal.actions';

export interface StateModal {
  modalType?: ModalTypes;
  isVisible?: boolean;
}

export const initialState: State = {
  modal: {
    modalType: ModalTypes.ConfirmType,
    isVisible: false,
  },
};

export const modalReducer = createReducer(
  initialState,
  on(
    setType,
    (state, { modalType }): State => ({
      ...state,
      modal: { modalType , isVisible: state.modal?.isVisible},
    })
  ),
  on(
    setVisibility,
    (state, {isVisible}): State => ({
      ...state,
      modal: { isVisible , modalType: state.modal?.modalType},
    })
  )
);
