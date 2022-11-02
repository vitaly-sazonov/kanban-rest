import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';

export const selectBoards = createFeatureSelector<State>('boards');

export const selectUserBoards = createSelector(
  selectBoards,
  (state: State) => state.userBoards?.boards
);
export const selectCurrentBoard = createSelector(
  selectBoards,
  (state: State) => state.userBoards?.currentBoardId
);
