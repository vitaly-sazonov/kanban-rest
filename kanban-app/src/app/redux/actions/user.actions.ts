import { createAction, props } from '@ngrx/store';
import { LoadingStateAction, UserAction } from 'src/app/enums';
import { GetUserByIdResponse } from 'src/app/interfaces';

export const loginUser = createAction(
  UserAction.login,
  props<{ user: GetUserByIdResponse }>()
);

export const logoutUser = createAction(UserAction.logout);

export const setLoadingTrue = createAction(LoadingStateAction.setTrue);
export const setLoadingFalse = createAction(LoadingStateAction.setFalse);
