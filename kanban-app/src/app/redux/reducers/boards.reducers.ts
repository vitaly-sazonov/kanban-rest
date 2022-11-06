import { createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/interfaces';
import { State } from '..';
import {
  addBoard,
  addBoards,
  addColumn,
  addColumns,
  loadColumns,
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
  on(addBoards, (state, { boards }): State => {
    console.log(boards);
    return {
      ...state,
      userBoards: { boards: [...boards] },
    };
  }),
  on(addColumns, (state, { id, columns }): State => {
    let currentBoardState = {
      ...state.userBoards?.boards!.find(el => el.id === id),
      columns: columns,
    };
    let currentUserBoardsState = state.userBoards?.boards?.filter(
      el => el.id !== id
    );
    return {
      ...state,
      userBoards: {
        boards: currentUserBoardsState
          ? [...currentUserBoardsState, currentBoardState]
          : [currentBoardState],
      },
    };
  })
);
