import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateStore, StateUser } from '../reducers/user.reducer';

export const selectUser = createFeatureSelector<StateStore>('users');

export const selectFeatureUser = createSelector(
  selectUser,
  (state: StateStore) => state.userState.user
);
export const selectFeatureUserLoggedIn = createSelector(
  selectUser,
  (state: StateStore) => state.userState.userLoggedIn
);

export const selectFeatureIsLoading = createSelector(
  selectUser,
  (state: StateStore) => state.isLoading
);
