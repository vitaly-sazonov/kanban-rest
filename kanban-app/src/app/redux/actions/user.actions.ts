import { createAction, props } from '@ngrx/store';
import { GetUserByIdResponse } from 'src/app/interfaces';

export const loginUser = createAction(
  '[User] Login User',
  props<{ user: GetUserByIdResponse }>()
);
