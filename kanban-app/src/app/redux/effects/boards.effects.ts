import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  debounceTime,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Board, Column, Task } from 'src/app/interfaces';
import {
  addBoard,
  addBoards,
  addColumn,
  addColumns,
  addTask,
  addTasks,
  deleteBoardById,
  editBoardById,
  editColumn,
  editTask,
  loadBoards,
  loadColumns,
  loadTasks,
  moveTaskToAnotherColumn,
  removeColumn,
  removeTask,
  restoreBoard,
} from '../actions/boards.actions';

@Injectable()
export class BoardsEffect {
  constructor(
    private actions$: Actions,
    private http: HttpService,
    private router: Router
  ) {}
  loadAllBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadBoards),
      debounceTime(300),
      switchMap(() => this.http.getBoards()),
      map((boards: Board[]) =>
        boards.map(board => this.http.getBoardById(board.id!))
      ),
      switchMap(data => forkJoin(data)),
      map((data: Board[]) =>
        data.map(board => ({
          ...board,
          columns: board.columns
            ?.sort((a, b) => a.order! - b.order!)
            .map(column => ({
              ...column,
              tasks: column.tasks?.sort((a, b) => a.order! - b.order!),
            })),
        }))
      ),
      map((boards: Board[]) => addBoards({ board: boards }))
    );
  });
  deleteBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBoardById),
      switchMap(({ id }) => this.http.deleteBoard(id)),
      map(() => loadBoards())
    );
  });
  editBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editBoardById),
      switchMap(({ id, title, description }) =>
        this.http.editBoard(id, title, description)
      ),
      map(() => loadBoards())
    );
  });
  restoreBoard$ = createEffect(() => {
    let boardId = '';
    let columnId = '';
    let oldBoard: Board;
    let oldColumns: Column[];
    return this.actions$.pipe(
      ofType(restoreBoard),
      tap(({ board }) => (oldBoard = board)),
      switchMap(({ board }) =>
        this.http.addBoard({
          title: board.title,
          description: board.description,
        })
      ),
      tap((board: Board) => (boardId = board.id!)),
      map(() => oldBoard.columns!),
      tap(columns => (oldColumns = columns)),
      mergeMap((columns: Column[]) => from(columns)),
      mergeMap((column: Column) =>
        this.http.addColumn(boardId, { title: column.title })
      ),
      map(() => loadBoards())
    );
  });

  addBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addBoard),
      switchMap(({ board }) => this.http.addBoard(board)),
      tap((board: Board) =>
        this.router.navigate(['../board', board.id, 'undefined', 'undefined'])
      ),
      map(() => loadBoards())
    );
  });
  loadColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadColumns),
      switchMap(({ id }) =>
        this.http.getColumns(id).pipe(
          map(columns =>
            columns.map(el => this.http.getColumnDetails(id, el.id!))
          ),
          switchMap(data => (!data.length ? of([]) : forkJoin(data))),
          map(data => {
            data.sort((a, b) => a.order! - b.order!);
            data.forEach(el => el.tasks?.sort((a, b) => a.order! - b.order!));
            return addColumns({
              id: id,
              columns: data,
            });
          })
        )
      )
    );
  });
  addColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addColumn),
      switchMap(({ boardId, column }) =>
        this.http
          .addColumn(boardId, column)
          .pipe(map(() => loadColumns({ id: boardId })))
      )
    );
  });
  removeColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeColumn),
      switchMap(({ boardId, columnId }) =>
        this.http
          .removeColumn(boardId, columnId)
          .pipe(map(() => loadColumns({ id: boardId })))
      )
    );
  });
  editColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editColumn),
      switchMap(({ boardId, columnId, columnOrder, column }) =>
        this.http
          .editColumn(boardId, columnId, columnOrder, column)
          .pipe(map(() => loadColumns({ id: boardId })))
      )
    );
  });
  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      switchMap(({ boardId, columnId }) =>
        this.http.getTasks(boardId, columnId).pipe(
          map((data: Task[]) => {
            data.sort((a, b) => a.order! - b.order!);
            return addTasks({
              boardId: boardId,
              columnId: columnId,
              tasks: data,
            });
          })
        )
      )
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
  editTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editTask),
      switchMap(({ boardId, columnId, taskId, taskOrder, task }) => {
        return this.http
          .editTask(boardId, columnId, taskId, {
            ...task,
            order: taskOrder,
            boardId: boardId,
            columnId: columnId,
          })
          .pipe(map(() => loadTasks({ boardId: boardId, columnId: columnId })));
      })
    );
  });
  removeTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeTask),
      switchMap(({ boardId, columnId, taskId }) =>
        this.http
          .removeTask(boardId, columnId, taskId)
          .pipe(map(() => loadTasks({ boardId: boardId, columnId: columnId })))
      )
    );
  });
  moveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(moveTaskToAnotherColumn),
      switchMap(
        ({
          boardId,
          oldColumnId,
          newColumnId,
          taskId,
          taskOrder,
          taskContent,
        }) =>
          this.http
            .editTask(boardId, oldColumnId, taskId, {
              title: taskContent.title,
              order: taskOrder,
              description: taskContent.description,
              userId: taskContent.userId,
              boardId: boardId,
              columnId: newColumnId,
            })
            .pipe(map((data: Task) => loadColumns({ id: data.boardId! })))
      )
    );
  });
}
