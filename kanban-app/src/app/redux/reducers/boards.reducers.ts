import { createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/interfaces';
import { State } from '..';
import {
  addBoards,
  addCurrentBoardId,
  deleteAllBoards,
} from '../actions/boards.actions';

export interface StateBoards {
  boards?: Board[];
  currentBoardId?: string;
}

export const initialState: State = {
  userBoards: {
    boards: [],
    currentBoardId: '',
  },
};

export const boardsReducer = createReducer(
  initialState,
  on(
    addBoards,
    (state, { board }): State => ({
      ...state,
      userBoards: { boards: [...state.userBoards?.boards!, board] },
    })
  ),
  on(
    addCurrentBoardId,
    (state, { id }): State => ({
      ...state,
      userBoards: { boards: state.userBoards?.boards, currentBoardId: id },
    })
  ),
  on(
    deleteAllBoards,
    (state): State => ({
      ...state,
      userBoards: {
        boards: [],
        currentBoardId: state.userBoards?.currentBoardId,
      },
    })
  )
);
