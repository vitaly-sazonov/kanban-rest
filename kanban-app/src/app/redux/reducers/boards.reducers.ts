import { createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/interfaces';
import { State } from '..';
import { addBoard } from '../actions/boards.actions';

export interface StateBoards {
  boards?: Board[];
  currentBoardId?: number | string | null;
}

export const initialState: State = {
  userBoards: {
    boards: [],
    currentBoardId: null,
  },
};

export const boardsReducer = createReducer(
  initialState,
  on(
    addBoard,
    (state, { board }): State => ({
      ...state,
      userBoards: { boards: [...state.userBoards!.boards!, board] },
    })
  )
);
