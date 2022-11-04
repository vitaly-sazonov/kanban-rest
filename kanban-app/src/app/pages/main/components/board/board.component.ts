import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ModalTypes } from 'src/app/enums';
import { Board } from 'src/app/interfaces';
import { deleteBoardById } from 'src/app/redux/actions/boards.actions';
import { addConfirmMessage } from 'src/app/redux/actions/confirm.actions';
import { setType, setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectConfirmationResult } from 'src/app/redux/selectors/confirmation.selectors';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board?: Board;
  result$ = this.store.select(selectConfirmationResult);
  constructor(private store: Store) {}

  deleteBoard(id: string) {
    this.confirmDelete(id);
    //this.store.dispatch(deleteBoardById({id}))
  }
  confirmDelete(id: string) {
    this.store.dispatch(setType({ modalType: ModalTypes.ConfirmType }));
    this.store.dispatch(setVisibility({ isVisible: true }));
    this.store.dispatch(addConfirmMessage({ message: 'CONFIRM_DELETE' }));
    this.result$.subscribe(data => {
      if (data) {
        this.store.dispatch(deleteBoardById({ id }));
      }
    });
  }
}
