import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, switchMap, map, first } from 'rxjs';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalSchemes, ModalTypes } from 'src/app/enums';
import { Board, Column } from 'src/app/interfaces';
import {
  addColumn,
  addTask,
  loadColumns,
  removeColumn,
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
  subscription?: Subscription;
  currentBoard$?: Observable<Board | undefined>;
  boardColumns$?: Observable<Column[] | undefined>;
  boardData?: Board;

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
        map(data => (this.id = data))
      )
      .subscribe(() => {
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

  createTask(columnId: string) {
    this.modalService.setExtra([
      this.id,
      columnId,
      this.localStorage.getUserId(),
    ]);
    this.modalService.setScheme(ModalSchemes.addTask);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }
}
