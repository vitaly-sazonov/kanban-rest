import { createAction, props } from '@ngrx/store';
import { BoardsActions, ColumnActions } from 'src/app/enums';
import { Board, Column } from 'src/app/interfaces';

export const addBoards = createAction(
  BoardsActions.AddBoards,
  props<{ boards: Board[] }>()
);
export const addBoard = createAction(
  BoardsActions.AddBoard,
  props<{ board: Board }>()
);
export const deleteBoardById = createAction(
  BoardsActions.DeleteBoardById,
  props<{ id: string }>()
);
export const loadBoardById = createAction(
  BoardsActions.LoadBoardById,
  props<{ id: string }>()
);
export const loadBoards = createAction(BoardsActions.LoadBoards);
export const addColumn = createAction(
  ColumnActions.AddColumn,
  props<{ boardData: Board; column: Column }>()
);
export const loadColumns = createAction(
  ColumnActions.LoadColumns,
  props<{ id: string }>()
);
export const addColumns = createAction(
  ColumnActions.AddColumns,
  props<{ id: string; columns: Column[] }>()
);
