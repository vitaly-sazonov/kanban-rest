import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { BOARDS, LAST_SEARCH } from 'src/app/constants';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Board } from 'src/app/interfaces';
import {
  deleteAllBoards,
  loadBoards,
} from 'src/app/redux/actions/boards.actions';
import { selectUserBoards } from 'src/app/redux/selectors/boards.selectors';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmQuestions, PercentSize } from 'src/app/enums';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SelectBoardDialogComponent } from './components/select-board-dialog/select-board-dialog.component';
import { CustomBoardComponent } from './components/custom-board/custom-board.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  boards$? = this.store.select(selectUserBoards);
  isLoading$ = this.store.select(selectFeatureIsLoading);
  searchRequest = this.storage.getItem(LAST_SEARCH) || '';
  isAllShort = false;
  isReverseBoards = false;
  isSearching = this.searchRequest ? true : false;
  boardsQuantity$ = this.getBoardQuantity();
  columnsQuantity$ = this.getColumnsQuantity();
  tasksQuantity$ = this.getTaskQuantity();

  constructor(
    private store: Store,
    private storage: LocalstorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reset();
  }

  reset(): void {
    [deleteAllBoards(), loadBoards()].forEach(action =>
      this.store.dispatch(action)
    );
  }

  deleteSearch() {
    this.searchRequest = '';
    this.rememberSearch();
  }

  rememberSearch() {
    this.storage.setItem(LAST_SEARCH, this.searchRequest);
    this.isSearching = this.searchRequest ? true : false;
  }

  getBoardQuantity() {
    return this.boards$?.pipe(
      map((boards: Board[] | undefined) => boards!.length)
    );
  }

  getColumnsQuantity() {
    let q = 0;
    return this.boards$?.pipe(
      tap(() => (q = 0)),
      switchMap(boards => from(boards!)),
      map(board => (q += board.columns!.length)),
      switchMap(() => of(q))
    );
  }
  getTaskQuantity() {
    let q = 0;
    return this.boards$?.pipe(
      tap(() => (q = 0)),
      mergeMap(boards => from(boards!)),
      map(board => board.columns),
      mergeMap(columns => from(columns!)),
      map(column => (q += column.tasks!.length)),
      switchMap(() => of(q))
    );
  }

  createCustomBoard() {
    const dialogRef = this.dialog.open(SelectBoardDialogComponent, {
      panelClass: 'dialog',
      enterAnimationDuration: '500ms',
      width: PercentSize.eighty,
      height: PercentSize.eighty,
      data: BOARDS,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
}
