import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs';
import { Board } from 'src/app/interfaces';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectCurrentBoard } from 'src/app/redux/selectors/boards.selectors';
import { selectConfirmationMessage } from 'src/app/redux/selectors/confirmation.selectors';
import { ConfirmService } from '../../services/confirm.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  info$ = this.store.select(selectConfirmationMessage);
  currentBoardTitle$ = this.store.select(selectCurrentBoard).pipe(
    tap(id => console.log(`id: ${id}`))
    //switchMap(id => this.httpService.getBoardById(id)),
    //map((bord: any) => bord.title)
  );
  buttonAgree = 'AGREE';
  buttonCancel = 'CANCEL';
  constructor(
    private confirmService: ConfirmService,
    private store: Store,
    private httpService: HttpService
  ) {}

  setResult(result: boolean) {
    this.confirmService.setConfirmResult(result);
    this.store.dispatch(setVisibility({ isVisible: false }));
  }
}
