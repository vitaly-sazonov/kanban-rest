import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, of, switchMap } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalTypes } from 'src/app/enums';
import { Board, Column } from 'src/app/interfaces';
import {
  addCurrentBoardId,
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
export class BoardComponent {

  @Input() board?: Board;
  result$ = this.store.select(selectConfirmationResult);
  columns$ = of(this.board?.id).pipe(
    switchMap(() => this.httpService.getColumns(this.board?.id))
  );
  length$ = this.columns$.pipe(map((items: Column[]) => items.length));

  constructor(private store: Store, private httpService: HttpService) {}
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

    this.result$.subscribe(data => {
      if (data) {
        this.store.dispatch(deleteBoardById({ id }));
      }
    });
  }
  toggle() {
    this.isPreview = !this.isPreview;
  }
}
