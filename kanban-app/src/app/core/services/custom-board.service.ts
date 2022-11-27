import { Injectable } from '@angular/core';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { SPECIAL_SYMBOL, TOTAL_PICTURES } from 'src/app/constants';
import { Board, Column, Task } from 'src/app/interfaces';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CustomBoardService {
  constructor(private http: HttpService) {}

  addColumnsToBorder(
    boardId: string | undefined,
    columns: Column[] | undefined
  ) {
    if (!boardId || !columns) throw Error;
    return columns.map(column =>
      this.http.addColumn(boardId, { title: column.title })
    );
  }

  addTaskToBorder(
    boardId: string | undefined,
    columnId: string | undefined,
    task: Task
  ) {
    if (!boardId || !columnId || !task) return;
    return this.http.addTask(boardId, columnId, task);
  }

  findColumn(title: string, board: Board, userId: string) {
    return board.columns
      ?.find(column => column.title === title)
      ?.tasks?.map(task => ({ ...task, userId: userId }));
  }

  saveBoardToUser(board: Board, userId: string) {
    let boardId: string | undefined;
    return this.http
      .addBoard({
        title:
          board.title + SPECIAL_SYMBOL + ((Math.random() * TOTAL_PICTURES) | 0),
        description: board.description,
      })
      .pipe(
        tap(createdBoard => {
          boardId = createdBoard.id;
        }),
        map(createdBoard =>
          this.addColumnsToBorder(createdBoard.id, board.columns)
        ),
        switchMap(board => forkJoin(board)),
        map(columns =>
          columns.map(column => ({
            columnId: column.id,
            tasks: this.findColumn(column.title, board, userId),
            boardId: boardId,
          }))
        ),
        map(columns =>
          columns
            .map(column =>
              column.tasks?.map(task =>
                this.addTaskToBorder(column.boardId, column.columnId, task)
              )
            )
            .flat()
        ),
        switchMap(task => forkJoin(task))
      );
  }
}
