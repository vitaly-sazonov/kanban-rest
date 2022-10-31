import { createAction, props } from '@ngrx/store';
import { GetUserByIdResponse } from 'src/app/interfaces';

export const loginUser = createAction(
  '[User] Login User',
  props<{ user: GetUserByIdResponse }>()
);

export const logoutUser = createAction('[User] Logout User');

export const setLoadingTrue = createAction('[State] LoadingState True');
export const setLoadingFalse = createAction('[State] LoadingState False');
