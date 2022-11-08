import { createAction, props } from '@ngrx/store';
import { ModalActions, ModalSchemes, ModalTypes } from 'src/app/enums';

export const setType = createAction(
  ModalActions.SetType,
  props<{ modalType: ModalTypes }>()
);
export const setScheme = createAction(
  ModalActions.SetScheme,
  props<{ modalScheme: ModalSchemes }>()
);
export const setVisibility = createAction(
  ModalActions.SetVisibility,
  props<{ isVisible: boolean }>()
);
