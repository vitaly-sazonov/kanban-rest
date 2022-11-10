import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, from, map, mergeMap, switchMap, tap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Board, Column, Task } from 'src/app/interfaces';
import {
  addBoard,
  addBoards,
  addColumn,
  addColumns,
  addTask,
  addTasks,
  deleteAllBoards,
  deleteBoardById,
  editColumn,
  loadBoards,
  loadColumns,
  loadTasks,
  removeColumn,
} from '../actions/boards.actions';

@Injectable()
export class BoardsEffect {
  constructor(private actions$: Actions, private http: HttpService) {}
  loadAllBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBoards),
      debounceTime(300),
      switchMap(() => this.http.getBoards()),
      switchMap((boards: Board[]) => from(boards)),
      mergeMap((board: Board) => this.http.getBoardById(board.id!)),
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
      switchMap(({ boardId, column }) => {
        return this.http
          .addColumn(boardId, column)
          .pipe(map(() => loadColumns({ id: boardId })));
      })
    );
  });
  removeColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeColumn),
      switchMap(({ boardId, columnId }) => {
        return this.http
          .removeColumn(boardId, columnId)
          .pipe(map(() => loadColumns({ id: boardId })));
      })
    );
  });
  editColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editColumn),
      switchMap(({ boardId, columnId, columnOrder, column }) => {
        return this.http
          .editColumn(boardId, columnId, columnOrder, column)
          .pipe(map(() => loadColumns({ id: boardId })));
      })
    );
  });
  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      switchMap(({ boardId, columnId }) => {
        return this.http
          .getTasks(boardId, columnId)
          .pipe(
            map((data: Task[]) =>
              addTasks({ boardId: boardId, columnId: columnId, tasks: data })
            )
          );
      })
    );
  });
  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      switchMap(({ boardId, columnId, task }) => {
        return this.http
          .addTask(boardId, columnId, task)
          .pipe(map(() => loadTasks({ boardId: boardId, columnId: columnId })));
      })
    );
  });
}
