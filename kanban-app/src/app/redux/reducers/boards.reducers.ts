import { createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/interfaces';
import { State } from '..';
import {
  addBoards,
  addColumns,
  addCurrentBoardId,
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
    (state, { boards }): State => ({
      ...state,
      userBoards: { boards },
    })
  ),
  on(addColumns, (state, { id, columns }): State => {
    columns = Object.values(columns);
    columns.sort((a, b) => a.order! - b.order!);
    return {
      ...state,
      userBoards: {
        boards: state.userBoards?.boards?.map(el =>
          el.id === id ? { ...el, columns } : { ...el }
        ),
      },
    };
  }),
  on(
    addCurrentBoardId,
    (state, { id }): State => ({
      ...state,
      userBoards: { boards: state.userBoards?.boards, currentBoardId: id },
    })
  )
);
