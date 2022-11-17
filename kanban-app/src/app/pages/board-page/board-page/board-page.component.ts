import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  filter,
  first,
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
import { COLUMN_BOTTOM_HEIGHT, COLUMN_TITLE_HEIGHT } from 'src/app/constants';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, AfterViewInit, OnDestroy {
  result$ = this.store.select(selectConfirmationResult);
  id: string = '';
  columnId: string | undefined = '';
  taskId: string | undefined = '';
  subscription?: Subscription;
  currentBoard$?: Observable<Board | undefined>;
  boardColumns$?: Observable<Column[] | undefined>;
  isLoading$: Observable<boolean> | undefined;
  isDragging = false;
  boardData?: Board;
  prevTaskData: string = '';
  unsubscribe$ = new Subject<any>();
  elementHeight = 0;
  columnTitleEdit: string | null = null;
  columnIndex = 0;
  columnMaxHeight = 0;

  @Input() newTitle = this.columnTitleEdit;

  @ViewChild('columnsElement') columnsElement!: ElementRef<HTMLElement>;

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
    this.route.paramMap
      .pipe(switchMap(params => params.getAll('columnId')))
      .subscribe(data => {
        this.columnId = data;
      });
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.columnId = params['columnId'];
      this.taskId = params['taskId'];
      this.currentBoard$ = this.store.select(selectBoardById(this.id));
    });
  }

  ngAfterViewInit(): void {
    this.columnMaxHeight =
      this.columnsElement.nativeElement.offsetHeight -
      COLUMN_TITLE_HEIGHT -
      COLUMN_BOTTOM_HEIGHT;
  }

  createColumn() {
    this.modalService.setExtra([this.id]);
    this.modalService.setScheme(ModalSchemes.addColumn);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  removeColumn(event: MouseEvent, id: string) {
    event.stopPropagation();
    [
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'BOARD.CONFIRM_DELETE_COLUMN' }),
    ].forEach(action => this.store.dispatch(action));

    this.result$
      .pipe(
        filter(isConfirmed => isConfirmed === true),
        first()
      )
      .subscribe(() =>
        this.store.dispatch(removeColumn({ boardId: this.id, columnId: id }))
      );
  }

  editColumn(
    event: Event,
    columnId: string,
    columnOrder: number,
    newTitle: string
  ) {
    event.stopImmediatePropagation();
    this.store.dispatch(
      editColumn({
        boardId: this.id,
        columnId: columnId,
        columnOrder: columnOrder,
        column: { title: newTitle },
      })
    );
    this.columnTitleEdit = null;
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

  removeTask(event: MouseEvent, taskId: string, columnId: string) {
    event.stopPropagation();
    [
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'BOARD.CONFIRM_DELETE_TASK' }),
    ].forEach(action => this.store.dispatch(action));

    this.result$
      .pipe(
        filter(isConfirmed => isConfirmed === true),
        first()
      )
      .subscribe(() =>
        this.store.dispatch(
          removeTask({
            boardId: this.id,
            columnId: columnId,
            taskId: taskId,
          })
        )
      );
  }

  dropTask(event: CdkDragDrop<{ tasks: Task[]; id: string }>) {
    this.isDragging = false;
    let prevArray = event.previousContainer.data;
    let prevIndex = event.previousIndex;
    let currIndex = event.container.data.tasks.length ? event.currentIndex : 0;
    let transferingElement = prevArray.tasks[prevIndex];
    if (currIndex !== prevIndex || prevArray.id !== event.container.data.id) {
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
  }

  dropColumn(event: CdkDragDrop<{ columns: Column[] }>) {
    let prevArray = event.previousContainer.data;
    let prevIndex = event.previousIndex;
    let currIndex = event.container.data.columns.length
      ? event.currentIndex
      : 0;
    let transferingElement = prevArray.columns[prevIndex];
    if (currIndex !== prevIndex) {
      this.store.dispatch(
        editColumn({
          boardId: this.id,
          columnId: transferingElement.id!,
          columnOrder: currIndex + 1,
          column: { title: transferingElement.title },
        })
      );
    }
  }

  editColumnTitle(event: MouseEvent, currentTitle: string, index: number) {
    event.stopPropagation();
    this.columnTitleEdit = currentTitle;
    this.columnIndex = index;
    this.newTitle = this.columnTitleEdit;
  }

  returnTitleState(event: MouseEvent) {
    event.stopPropagation();
    this.columnTitleEdit = null;
  }

  accordionPreventCollapse(event: MouseEvent) {
    event.stopPropagation();
  }

  checkHeight(element: HTMLElement) {
    this.elementHeight = element.offsetHeight;
  }
}
