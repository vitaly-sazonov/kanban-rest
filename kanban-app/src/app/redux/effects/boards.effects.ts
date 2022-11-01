import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { format } from 'prettier';
import { from, map, switchMap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Board } from 'src/app/interfaces';
import { addBoard, loadBoards } from '../actions/boards.actions';

@Injectable()
export class BoardsEffect {
  constructor(private actions$: Actions, private http: HttpService) {}
  loadAllBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBoards),
      switchMap(() => this.http.getBoards()),
      switchMap((boards:Board[] )=> from(boards)),
      map((data) => addBoard({board:data}))
    );
  });
}
