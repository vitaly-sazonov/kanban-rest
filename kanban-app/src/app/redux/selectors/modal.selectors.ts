import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';

export const selectModal = createFeatureSelector<State>('modals');

export const selectModalVisibility = createSelector(
  selectModal,
  (state: State) => state.modal?.isVisible
);
export const selectModalType = createSelector(
  selectModal,
  (state: State) => state.modal?.modalType
);
