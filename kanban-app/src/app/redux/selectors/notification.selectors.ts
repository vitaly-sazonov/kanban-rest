import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '..';

export const selectNotification = createFeatureSelector<State>('notifications');

export const selectNotificationMessage = createSelector(
  selectNotification,
  (state: State) => state.notification?.message
);
