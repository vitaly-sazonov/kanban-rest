import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  switchMap,
  map,
  of,
  takeUntil,
  Subject,
} from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalSchemes, ModalTypes } from 'src/app/enums';
import { Board, Column, Task } from 'src/app/interfaces';
import {
  editColumn,
  loadBoards,
  moveTaskToAnotherColumn,
  removeColumn,
  removeTask,
} from 'src/app/redux/actions/boards.actions';
import { addConfirmMessage } from 'src/app/redux/actions/confirm.actions';
import { setType, setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectBoardById } from 'src/app/redux/selectors/boards.selectors';
import { selectConfirmationResult } from 'src/app/redux/selectors/confirmation.selectors';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  result$ = this.store.select(selectConfirmationResult);
  id: string = '';
  subscription?: Subscription;
  currentBoard$?: Observable<Board | undefined>;
  boardColumns$?: Observable<Column[] | undefined>;
  isLoading$: Observable<boolean> | undefined;
  boardData?: Board;
  prevTaskData: string = '';
  unsubscribe$ = new Subject<any>();
  elementHeight = 0;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private store: Store,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(
        switchMap(params => params.getAll('id')),
        map(data => (this.id = data)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.store
          .select(selectBoardById(this.id))
          .pipe(
            map(data => {
              if (!data) {
                return this.store.dispatch(loadBoards());
              }
            }),
            switchMap(() => this.store.select(selectBoardById(this.id))),
            takeUntil(this.unsubscribe$)
          )
          .subscribe(data => (this.currentBoard$ = of(data)));
      });
    this.isLoading$ = this.store.select(selectFeatureIsLoading);
  }

  createColumn() {
    this.modalService.setExtra([this.id]);
    this.modalService.setScheme(ModalSchemes.addColumn);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  removeColumn(id: string) {
    [
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'BOARD.CONFIRM_DELETE_COLUMN' }),
    ].forEach(action => this.store.dispatch(action));

    this.result$.subscribe(isConfirmed => {
      if (isConfirmed) {
        this.store.dispatch(removeColumn({ boardId: this.id, columnId: id }));
      }
    });
  }

  editColumn(columnId: string, columnOrder: number, currentTitle: string) {
    this.modalService.setExtra([this.id, columnId, columnOrder, currentTitle]);
    this.modalService.setScheme(ModalSchemes.editColumn);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

  toggleColumnOptions($event: Event) {
    $event.stopPropagation();
  }

  addTask(columnId: string) {
    this.modalService.setExtra([
      columnId,
      this.id,
      this.localStorage.getUserId(),
    ]);
    this.modalService.setScheme(ModalSchemes.addTask);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  editTask(
    taskId: string,
    columnId: string,
    taskOrder: number,
    currentState: { title: string; description: string }
  ) {
    this.modalService.setExtra([
      taskId,
      columnId,
      this.id,
      this.localStorage.getUserId(),
      taskOrder,
      currentState,
    ]);
    this.modalService.setScheme(ModalSchemes.editTask);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  removeTask(taskId: string, columnId: string) {
    [
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'BOARD.CONFIRM_DELETE_TASK' }),
    ].forEach(action => this.store.dispatch(action));

    this.result$.subscribe(isConfirmed => {
      if (isConfirmed) {
        this.store.dispatch(
          removeTask({ boardId: this.id, columnId: columnId, taskId: taskId })
        );
      }
    });
  }

  dropTask(event: CdkDragDrop<{ tasks: Task[]; id: string }> | any) {
    let prevArray = event.previousContainer.data;
    let prevIndex = event.previousIndex;
    let currIndex = event.container.data.tasks.length ? event.currentIndex : 0;
    let transferingElement = prevArray.tasks[prevIndex];
    this.store.dispatch(
      moveTaskToAnotherColumn({
        boardId: this.id,
        oldColumnId: prevArray.id,
        newColumnId: event.container.data.id,
        taskId: transferingElement.id!,
        taskOrder: currIndex + 1,
        taskContent: transferingElement,
      })
    );
  }

  dropColumn(event: CdkDragDrop<{ columns: Column[] }>) {
    let prevArray = event.previousContainer.data;
    let prevIndex = event.previousIndex;
    let currIndex = event.container.data.columns.length
      ? event.currentIndex
      : 0;
    let transferingElement = prevArray.columns[prevIndex];
    this.store.dispatch(
      editColumn({
        boardId: this.id,
        columnId: transferingElement.id!,
        columnOrder: currIndex + 1,
        column: { title: transferingElement.title },
      })
    );
  }

  setElementHeight(event: CdkDragStart<HTMLElement>) {
    this.elementHeight = event.source.element.nativeElement.clientHeight;
  }
}
