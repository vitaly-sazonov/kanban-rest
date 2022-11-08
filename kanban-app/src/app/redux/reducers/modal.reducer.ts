import { createReducer, on } from '@ngrx/store';
import { ModalSchemes, ModalTypes } from 'src/app/enums';
import { State } from '..';
import { setScheme, setType, setVisibility } from '../actions/modal.actions';

export interface StateModal {
  modalType?: ModalTypes;
  modalScheme?: ModalSchemes;
  isVisible?: boolean;
}

export const initialState: State = {
  modal: {
    modalType: ModalTypes.ConfirmType,
    modalScheme: ModalSchemes.addBoard,
    isVisible: false,
  },
};

export const modalReducer = createReducer(
  initialState,
  on(
    setType,
    (state, { modalType }): State => ({
      ...state,
      modal: {
        modalType,
        modalScheme: state.modal?.modalScheme,
        isVisible: state.modal?.isVisible,
      },
    })
  ),
  on(
    setScheme,
    (state, { modalScheme }): State => ({
      ...state,
      modal: {
        modalType: state.modal?.modalType,
        modalScheme,
        isVisible: state.modal?.isVisible,
      },
    })
  ),
  on(
    setVisibility,
    (state, { isVisible }): State => ({
      ...state,
      modal: {
        modalType: state.modal?.modalType,
        modalScheme: state.modal?.modalScheme,
        isVisible,
      },
    })
  )
);
