import { createAction, props } from '@ngrx/store';
import { ModalActions, ModalTypes } from 'src/app/enums';

export const setType = createAction(
  ModalActions.SetType,
  props<{ modalType: ModalTypes} >()
);
export const setVisibility = createAction(
    ModalActions.SetVisibility,
    props<{ isVisible: boolean }>()
);
