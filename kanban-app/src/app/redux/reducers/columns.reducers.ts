import { createReducer, on } from '@ngrx/store';
import { Board, Column } from 'src/app/interfaces';
import { StateBoards } from './boards.reducers';
import { addColumn } from '../actions/columns.actions';

export interface StateColumns extends StateBoards {
  boards: [
    {
      columns: Column[];
    }
  ];
}

export const initialState: StateColumns = {
  boards: [
    {
      columns: [],
    },
  ],
};

export const columntReducer = createReducer(
  initialState,
  on(addColumn, (state, { column }): StateColumns => {
    // const boardIndex = state.boards.findIndex(el => el.id === boardId);
    console.log(state.boards);
    return {
      ...state,
      boards: [
        {
          columns: [column],
        },
      ],
    };
  })
);
