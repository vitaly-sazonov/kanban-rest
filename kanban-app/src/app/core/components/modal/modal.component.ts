import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ModalTypes } from 'src/app/enums';
import { addConfirmResult } from 'src/app/redux/actions/confirm.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectModalVisibility } from 'src/app/redux/selectors/modal.selectors';
import { ModalService } from '../../services/modal.service';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  isModalVisible$ = this.store.select(selectModalVisibility);
  ModalTypes = ModalTypes;
  modalType$ = this.modalService.getType();

  constructor(private modalService: ModalService, private store: Store) {}

  exit() {
    [
      setVisibility({ isVisible: false }),
      addConfirmResult({ result: false }),
    ].forEach(action => this.store.dispatch(action));
  }
}
