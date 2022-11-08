import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, mergeMap, switchMap, tap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Board } from 'src/app/interfaces';
import {
  addBoard,
  addBoards,
  deleteBoardById,
  loadBoards,
} from '../actions/boards.actions';

@Injectable()
export class BoardsEffect {
  constructor(private actions$: Actions, private http: HttpService) {}
  loadAllBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBoards),
      switchMap(() => this.http.getBoards()),
      switchMap((boards: Board[]) => from(boards)),
      mergeMap((board: Board) => this.http.getBoardById(board.id)),
      tap(data => console.log(data)),
      map((data: Board) => addBoards({ board: data }))
    );
  });
  deleteBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBoardById),
      switchMap(({ id }) => this.http.deleteBoard(id)),
      map(() => loadBoards())
    );
  });
  addBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addBoard),
      switchMap(({ board }) => this.http.addBoard(board)),
      map(() => loadBoards())
    );
  });
}
