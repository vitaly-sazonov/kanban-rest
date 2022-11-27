import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LAST_SEARCH, PICTURES_PER_CATEGORY, BOARDS } from 'src/app/constants';
import { BasketService } from 'src/app/core/services/basket.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { PictureCategories } from 'src/app/enums';
import { Board } from 'src/app/interfaces';
import {
  BehaviorSubject,
  from,
  map,
  mergeMap,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ScrollService } from 'src/app/core/services/scroll.service';
import {
  deleteAllBoards,
  loadBoards,
} from 'src/app/redux/actions/boards.actions';
import { selectUserBoards } from 'src/app/redux/selectors/boards.selectors';
import {
  selectFeatureIsLoading,
  selectFeatureUser,
} from 'src/app/redux/selectors/user.selectors';
import { MatDialog } from '@angular/material/dialog';
import { PercentSize } from 'src/app/enums';
import { SelectBoardDialogComponent } from './components/select-board-dialog/select-board-dialog.component';
import { CustomBoardService } from 'src/app/core/services/custom-board.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  boards$? = this.store.select(selectUserBoards);
  isLoading$ = this.store.select(selectFeatureIsLoading);
  searchRequest = this.storage.getItem(LAST_SEARCH) || '';
  isAllShort = false;
  isReverseBoards = false;
  isSearching = this.searchRequest ? true : false;
  boardsQuantity$ = this.getBoardQuantity();
  columnsQuantity$ = this.getColumnsQuantity();
  tasksQuantity$ = this.getTaskQuantity();
  boardsInBasket = 0;
  basket$$?: BehaviorSubject<Board[]>;
  isSelectPicture = false;
  pictureCategories = Object.values(PictureCategories);
  pictureNames = new Array(PICTURES_PER_CATEGORY)
    .fill(0)
    .map((el, index) => index);
  userId$ = this.store.select(selectFeatureUser);
  unsubscribe$ = new Subject();
  userId: string = '';

  constructor(
    private store: Store,
    private storage: LocalstorageService,
    public dialog: MatDialog,
    private customBoardService: CustomBoardService,
    private basket: BasketService,
    private scrollService: ScrollService
  ) {}
  posY$$ = this.scrollService.getPositionY();
  downPos = Math.round(document.body.scrollHeight);
  scrollHeight$$ = this.scrollService.getScrollHeight();

  ngOnInit(): void {
    this.userId$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      if (x?.id) this.userId = x?.id;
    });

    this.reset();
    this.basket$$ = this.basket.getBasket();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
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
        const board = result as Board;
        this.customBoardService
          .saveBoardToUser(board, this.userId)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(x => this.reset());
      }
    });
  }

  scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  scrollUp() {
    window.scrollTo(0, 0);
  }
}
