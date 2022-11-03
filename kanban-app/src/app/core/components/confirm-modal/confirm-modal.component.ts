import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectConfirmationMessage } from 'src/app/redux/selectors/confirmation.selectors';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  info$ = this.store.select(selectConfirmationMessage);
  buttonAgree = 'AGREE';
  buttonCancel = 'CANCEL';
  constructor(private confirmService: ConfirmService, private store: Store) {}

  setResult(result: boolean) {
    this.confirmService.setConfirmResult(result);
    this.store.dispatch(setVisibility({ isVisible: false }));
  }
}
