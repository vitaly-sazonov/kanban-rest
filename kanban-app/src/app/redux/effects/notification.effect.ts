import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addNotification } from '../actions/notification.actions';

@Injectable()
export class NotificationEffect {
  constructor(private actions$: Actions) {}
  receiveNotification$ = createEffect(
    () => {
      return this.actions$.pipe(ofType(addNotification));
    },
    { dispatch: false }
  );
}
