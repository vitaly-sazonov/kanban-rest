import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  pipe,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { BOARDS, LAST_SEARCH } from 'src/app/constants';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Board, Column, Task } from 'src/app/interfaces';
import { BasketService } from 'src/app/core/services/basket.service';
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
import { ConfirmQuestions, PercentSize, RouterStateValue } from 'src/app/enums';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SelectBoardDialogComponent } from './components/select-board-dialog/select-board-dialog.component';
import { CustomBoardComponent } from './components/custom-board/custom-board.component';
import { HttpService } from 'src/app/core/services/http.service';
import { Router } from '@angular/router';

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
  userId$ = this.store.select(selectFeatureUser);
  unsubscribe$ = new Subject();
  userId: string = '';

  constructor(
    private store: Store,
    private storage: LocalstorageService,
    public dialog: MatDialog,
    private http: HttpService,
    private basket: BasketService,
    private scrollService: ScrollService
  ) {}
  boardsInBasket = 0;
  basket$$?: BehaviorSubject<Board[]>;
  posY$$ = this.scrollService.getPositionY();
  downPos = Math.round(document.body.scrollHeight);
  scrollHeight$$ = this.scrollService.getScrollHeight();

  checkY(event: MouseEvent) {
    console.log(document.body.scrollHeight);
    console.log(event.clientY + window.scrollY);
  }
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
        this.saveBoardToUser(board)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(x => this.reset());
      }
    });
  }

  saveBoardToUser(board: Board) {
    let boardId: string | undefined;
    return this.http
      .addBoard({ title: board.title, description: board.description })
      .pipe(
        tap(createdBoard => {
          boardId = createdBoard.id;
        }),
        map(createdBoard =>
          this.addColumnsToBorder(createdBoard.id, board.columns)
        ),
        switchMap(board => forkJoin(board)),
        map(columns =>
          columns.map(column => ({
            columnId: column.id,
            tasks: this.findColumn(column.title, board),
            boardId: boardId,
          }))
        ),
        map(columns =>
          columns
            .map(column =>
              column.tasks?.map(task =>
                this.addTaskToBorder(column.boardId, column.columnId, task)
              )
            )
            .flat()
        ),
        switchMap(task => forkJoin(task))
      );
  }

  addColumnsToBorder(
    boardId: string | undefined,
    columns: Column[] | undefined
  ) {
    if (!boardId || !columns) throw Error;
    return columns.map(column =>
      this.http.addColumn(boardId, { title: column.title })
    );
  }

  addTaskToBorder(
    boardId: string | undefined,
    columnId: string | undefined,
    task: Task
  ) {
    if (!boardId || !columnId || !task) return;
    return this.http.addTask(boardId, columnId, task);
  }

  findColumn(title: string, board: Board) {
    return board.columns
      ?.find(column => column.title === title)
      ?.tasks?.map(task => ({ ...task, userId: this.userId }));
  }

  scrollDown() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  scrollUp() {
    window.scrollTo(0, 0);
  }
  checkDown = (pos: number) => pos < document.body.scrollHeight * 0.7;
}
