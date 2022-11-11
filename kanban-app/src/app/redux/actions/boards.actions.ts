import { createAction, props } from '@ngrx/store';
import { BoardsActions, ColumnActions, TaskActions } from 'src/app/enums';
import { Board, Column, Task } from 'src/app/interfaces';

export const addBoards = createAction(
  BoardsActions.AddBoards,
  props<{ board: Board }>()
);
export const addBoard = createAction(
  BoardsActions.AddBoard,
  props<{ board: Board }>()
);
export const addCurrentBoardId = createAction(
  BoardsActions.AddCurentBoardId,
  props<{ id: string }>()
);
export const deleteBoardById = createAction(
  BoardsActions.DeleteBoardById,
  props<{ id: string }>()
);
export const deleteAllBoards = createAction(BoardsActions.DeleteAllBoards);
export const loadBoardById = createAction(
  BoardsActions.LoadBoardById,
  props<{ id: string }>()
);
export const loadBoards = createAction(BoardsActions.LoadBoards);
export const addColumn = createAction(
  ColumnActions.AddColumn,
  props<{ boardId: string; column: Column }>()
);
export const editColumn = createAction(
  ColumnActions.EditColumn,
  props<{
    boardId: string;
    columnId: string;
    columnOrder: number;
    column: Column;
  }>()
);
export const loadColumns = createAction(
  ColumnActions.LoadColumns,
  props<{ id: string }>()
);
export const loadDetailedColumns = createAction(
  ColumnActions.loadDetailedColumns,
  props<{ boardId: string; columns: Column[] }>()
);
export const addColumns = createAction(
  ColumnActions.AddColumns,
  props<{ id: string; columns: Column[] }>()
);
export const removeColumn = createAction(
  ColumnActions.RemoveColumn,
  props<{ boardId: string; columnId: string }>()
);
export const loadTasks = createAction(
  TaskActions.LoadTasks,
  props<{ boardId: string; columnId: string }>()
);
export const addTask = createAction(
  TaskActions.AddTask,
  props<{ boardId: string; columnId: string; task: Task }>()
);
export const addTasks = createAction(
  TaskActions.AddTasks,
  props<{ boardId: string; columnId: string; tasks: Task[] }>()
);
