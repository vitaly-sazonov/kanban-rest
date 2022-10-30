import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, tap } from 'rxjs';
import { loginUser } from '../actions/user.actions';

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions) {}
  fetchUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginUser),
        catchError(() => EMPTY)
      );
    },
    { dispatch: false }
  );
}
