import { createAction, props } from '@ngrx/store';
import { ColumnActions } from 'src/app/enums';
import { Column } from 'src/app/interfaces';

export const addColumn = createAction(
  ColumnActions.AddColumn,
  props<{ column: Column }>()
);
