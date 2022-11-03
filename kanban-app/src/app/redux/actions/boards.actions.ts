import { createAction, props } from '@ngrx/store';
import { BoardsActions } from 'src/app/enums';
import { Board } from 'src/app/interfaces';

export const addBoards = createAction(
  BoardsActions.AddBoards,
  props<{ boards: Board[]} >()
);
export const addBoard = createAction(
  BoardsActions.AddBoard,
  props<{ board: Board} >()
);
export const deleteBoardById = createAction(
    BoardsActions.DeleteBoardById,
    props<{ id: string }>()
);
export const loadBoardById = createAction(
    BoardsActions.LoadBoardById,
    props<{ id: number }>()
);
export const loadBoards= createAction(
    BoardsActions.LoadBoards,
    
);