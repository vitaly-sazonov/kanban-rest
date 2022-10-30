import { createReducer, on } from '@ngrx/store';
import { GetUserByIdResponse } from 'src/app/interfaces';
import { loginUser } from '../actions/user.actions';

export interface StateStore {
  userState: StateUser;
}

export interface StateUser {
  user: GetUserByIdResponse | null;
  userLoggedIn: boolean;
}

export const initialState: StateStore = {
  userState: {
    user: null,
    userLoggedIn: false,
  },
};

export const userReducer = createReducer(
  initialState,
  on(
    loginUser,
    (state, { user }): StateStore => ({
      ...state,
      userState: { user: user, userLoggedIn: true },
    })
  )
);
