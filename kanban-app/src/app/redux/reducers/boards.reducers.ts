import { createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/interfaces';
import { State } from '..';
import { addBoards, addCurrentBoardId } from '../actions/boards.actions';

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
    (state, { boards }): State => ({
      ...state,
      userBoards: { boards },
    })
  ),
  on(
    addCurrentBoardId,
    (state, { id }): State => ({
      ...state,
      userBoards: { boards: state.userBoards?.boards, currentBoardId: id },
    })
  )
);
