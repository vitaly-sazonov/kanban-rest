import { createReducer, on } from '@ngrx/store';
import { GetUserByIdResponse } from 'src/app/interfaces';
import {
  loginUser,
  setLoadingFalse,
  setLoadingTrue,
} from '../actions/user.actions';

export interface StateStore {
  userState: StateUser;
  isLoading: boolean;
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
  isLoading: false,
};

export const userReducer = createReducer(
  initialState,
  on(
    loginUser,
    (state, { user }): StateStore => ({
      ...state,
      userState: { user: user, userLoggedIn: true },
    })
  ),
  on(setLoadingTrue, (state): StateStore => ({ ...state, isLoading: true })),
  on(setLoadingFalse, (state): StateStore => ({ ...state, isLoading: false }))
);
