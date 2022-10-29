import { createAction, props } from '@ngrx/store';
import { GetUserByIdResponse } from 'src/app/interfaces';

export const loginUser = createAction(
  '[User] Login User',
  props<{ user: GetUserByIdResponse }>()
);

export const GetUsersStatus = createAction('[User] Get Users Status');

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);
