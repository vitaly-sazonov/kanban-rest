import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';
import { StateColumns } from '../reducers/columns.actions';

export const selectColumns = createFeatureSelector<State>('columns');

export const selectColumn = createSelector(
  selectColumns,
  (state: State, id: string) =>
    state.userBoards?.boards?.find(el => el.id === id)
);
