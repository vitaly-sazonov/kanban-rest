import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
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
  }
  confirmDelete(id: string) {
    [
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'CONFIRM_DELETE' }),
    ].map(action => this.store.dispatch(action));

    this.result$.subscribe(data => {
      if (data) {
        this.store.dispatch(deleteBoardById({ id }));
      }
    });
  }
}
