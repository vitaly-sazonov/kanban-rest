import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';

export const selectConfirmation = createFeatureSelector<State>('confirmations');

export const selectConfirmationMessage = createSelector(
  selectConfirmation,
  (state: State) => state.confirmation?.message
);
export const selectConfirmationResult = createSelector(
  selectConfirmation,
  (state: State) => state.confirmation?.result
);
