import { createReducer, on } from '@ngrx/store';
import { Board, Column } from 'src/app/interfaces';
import { State } from '..';
import {
  addBoards,
  addCurrentBoardId,
  deleteAllBoards,
  addColumns,
  loadTasks,
  addTasks,
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
  on(addColumns, (state, { id, columns }): State => {
    return {
      ...state,
      userBoards: {
        boards: state.userBoards?.boards?.map(el =>
          el.id === id
            ? {
                ...el,
                columns,
              }
            : { ...el }
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
  ),
  on(addTasks, (state, { boardId, columnId, tasks }) => {
    return {
      ...state,
      userBoards: {
        boards: state.userBoards?.boards?.map(el =>
          el.id === boardId
            ? {
                ...el,
                columns: el.columns?.map(elCol =>
                  elCol.id === columnId ? { ...elCol, tasks } : { ...elCol }
                ),
              }
            : { ...el }
        ),
      },
    };
  })
);
