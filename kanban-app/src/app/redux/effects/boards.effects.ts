import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  concatMap,
  debounceTime,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AudioService } from 'src/app/core/services/audio.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SystemSound } from 'src/app/enums';
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
import { deleteConfirmResult } from '../actions/confirm.actions';

@Injectable()
export class BoardsEffect {
  constructor(
    private actions$: Actions,
    private http: HttpService,
    private router: Router,
    private audioService: AudioService
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
      tap(() => this.audioService.play(SystemSound.delete)),
      switchMap(({ id }) => this.http.deleteBoard(id)),
      map(() => loadBoards())
    );
  });
  editBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editBoardById),
      tap(() => this.audioService.play(SystemSound.success)),
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
    let oldTasks: Task[];
    return this.actions$.pipe(
      ofType(restoreBoard),
      tap(() => this.audioService.play(SystemSound.success)),
      tap(({ board }) => (oldBoard = board)),
      switchMap(({ board }) =>
        this.http.addBoard({
          title: board.title,
          description: board.description,
        })
      ),
      tap((board: Board) => (boardId = board.id!)),
      map(() => oldBoard.columns!),
      concatMap((columns: Column[]) => from(columns)),
      concatMap((column: Column) => {
        oldTasks = column.tasks!;
        return this.http.addColumn(boardId, { title: column.title }).pipe(
          tap((column: any) => (columnId = column.id)),
          concatMap(() => from(oldTasks)),
          concatMap((task: any) =>
            this.http.addTask(boardId, columnId, {
              title: task.title,
              description: task.description,
              userId: task.userId,
            })
          )
        );
      }),

      map(() => deleteConfirmResult())
    );
  });

  addBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addBoard),
      tap(() => this.audioService.play(SystemSound.success)),
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
      tap(() => this.audioService.play(SystemSound.success)),
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
      tap(() => this.audioService.play(SystemSound.delete)),
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
      tap(() => this.audioService.play(SystemSound.success)),
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
      tap(() => this.audioService.play(SystemSound.success)),
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
      tap(() => this.audioService.play(SystemSound.success)),
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
      tap(() => this.audioService.play(SystemSound.delete)),
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
      tap(() => this.audioService.play(SystemSound.success)),
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
