import { createAction, props } from '@ngrx/store';
import { NotificationActions } from 'src/app/enums';

export const addNotification = createAction(
  NotificationActions.AddNotification,
  props<{ message: string }>()
);
export const deleteNotification = createAction(
  NotificationActions.DeleteNotification
);
