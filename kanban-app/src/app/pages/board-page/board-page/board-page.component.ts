import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  switchMap,
  map,
  first,
  from,
  of,
} from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalSchemes, ModalTypes } from 'src/app/enums';
import { Board, Column, Task } from 'src/app/interfaces';
import {
  addColumn,
  addTask,
  loadColumns,
  moveTaskToAnotherColumn,
  removeColumn,
  removeTask,
} from 'src/app/redux/actions/boards.actions';
import { addConfirmMessage } from 'src/app/redux/actions/confirm.actions';
import { setType, setVisibility } from 'src/app/redux/actions/modal.actions';
import {
  selectBoardById,
  selectUserBoards,
} from 'src/app/redux/selectors/boards.selectors';
import { selectConfirmationResult } from 'src/app/redux/selectors/confirmation.selectors';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  result$ = this.store.select(selectConfirmationResult);
  id: string = '';
  columnId: string | undefined = '';
  taskId: string | undefined = '';
  subscription?: Subscription;
  currentBoard$?: Observable<Board | undefined>;
  boardColumns$?: Observable<Column[] | undefined>;
  boardData?: Board;
  prevTaskData: string = '';
  isDragging = false;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private store: Store,
    private localStorage: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.columnId = params['columnId'];
      this.taskId = params['taskId'];
      this.currentBoard$ = this.store.select(selectBoardById(this.id));
    });
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
    this.subscription?.unsubscribe();
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

  recordPreviousTaskData(taskId: string) {
    this.prevTaskData = taskId;
    this.isDragging = true;
  }

  dropTask(event: CdkDragDrop<Task[]>, targetColumnId: string) {
    this.isDragging = false;
    let prevArray = event.previousContainer.data;
    let prevIndex = event.previousIndex;
    let currIndex = event.currentIndex;
    let transferingElement = prevArray[prevIndex];
    this.store.dispatch(
      moveTaskToAnotherColumn({
        boardId: this.id,
        oldColumnId: this.prevTaskData,
        newColumnId: targetColumnId,
        taskId: transferingElement.id!,
        taskOrder: currIndex + 1,
        taskContent: transferingElement,
      })
    );
  }
}
