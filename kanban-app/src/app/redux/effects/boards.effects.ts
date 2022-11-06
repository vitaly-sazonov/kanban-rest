import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, mergeMap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { ColumnActions } from 'src/app/enums';
import { Board, Column } from 'src/app/interfaces';
import {
  addBoard,
  addBoards,
  addColumn,
  addColumns,
  deleteBoardById,
  loadBoardById,
  loadBoards,
  loadColumns,
  removeColumn,
} from '../actions/boards.actions';

@Injectable()
export class BoardsEffect {
  constructor(private actions$: Actions, private http: HttpService) {}
  loadAllBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBoards),
      switchMap(() => this.http.getBoards()),
      tap(data => console.log(data)),
      map((data: Board[]) => addBoards({ boards: data }))
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
  loadBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadColumns),
      switchMap(({ id }) =>
        this.http.getColumns(id).pipe(
          map((data: Column[]) => {
            return addColumns({
              columns: data,
              id: id,
            });
          })
        )
      )
    );
  });
  addColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addColumn),
      switchMap(({ boardData, column }) => {
        return this.http
          .addColumn(boardData, column)
          .pipe(map(() => loadColumns({ id: boardData.id! })));
      })
    );
  });
  removeColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeColumn),
      switchMap(({ boardData, columnId }) => {
        return this.http
          .removeColumn(boardData, columnId)
          .pipe(map(() => loadColumns({ id: boardData.id! })));
      })
    );
  });
}
