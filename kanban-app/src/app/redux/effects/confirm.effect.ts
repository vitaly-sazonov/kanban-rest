import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addConfirmMessage, addConfirmResult } from '../actions/confirm.actions';

@Injectable()
export class ConfirmationEffect {
  constructor(private actions$: Actions) {}
  putUserResult$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addConfirmResult),

      );
    },
    { dispatch: false }
  );
  putUserMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addConfirmMessage),

      );
    },
    { dispatch: false }
  );
}
