import { createAction, props } from '@ngrx/store';
import { ConfirmActions } from 'src/app/enums';

export const addConfirmMessage = createAction(
  ConfirmActions.AddConfirmMessage,
  props<{ message: string }>()
);
export const deleteConfirmMessage = createAction(
  ConfirmActions.DeleteConfirmMessage
);
export const addConfirmResult = createAction(
  ConfirmActions.AddConfirmResult,
  props<{ result: boolean | null }>()
);
export const deleteConfirmResult = createAction(
  ConfirmActions.DeleteConfirmResult
);
