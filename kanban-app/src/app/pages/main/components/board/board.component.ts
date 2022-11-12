import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalTypes } from 'src/app/enums';
import { Board, Column } from 'src/app/interfaces';
import {
  addCurrentBoardId,
  deleteAllBoards,
  deleteBoardById,
} from 'src/app/redux/actions/boards.actions';
import { addConfirmMessage } from 'src/app/redux/actions/confirm.actions';
import { setType, setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectConfirmationResult } from 'src/app/redux/selectors/confirmation.selectors';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnDestroy, OnInit {
  subscription?: Subscription;
  @Input() board?: Board;
  @Input() searchRequest: string = '';
  result$ = this.store.select(selectConfirmationResult);
  columns?: Column[];
  length: number | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.columns = this.board?.columns;
    this.length = this.columns!.length;
  }

  isPreview = false;
  deleteBoard(id: string) {
    this.confirmDelete(id);
  }

  confirmDelete(id: string) {
    [
      addCurrentBoardId({ id }),
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'CONFIRM_DELETE' }),
    ].forEach(action => this.store.dispatch(action));

    this.subscription = this.result$.subscribe(data => {
      if (data) {
        [deleteAllBoards(), deleteBoardById({ id })].forEach(action =>
          this.store.dispatch(action)
        );
      }
    });
  }
  toggle() {
    this.isPreview = !this.isPreview;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
