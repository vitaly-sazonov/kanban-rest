import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ModalTypes } from 'src/app/enums';
import { addConfirmResult } from 'src/app/redux/actions/confirm.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectModalVisibility } from 'src/app/redux/selectors/modal.selectors';
import { ConfirmService } from '../../services/confirm.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  isModalVisible$ = this.store.select(selectModalVisibility);
  ModalTypes = ModalTypes;
  modalType$ = this.modalService.getType();

  constructor(private modalService: ModalService, private store: Store) {}

  ngOnInit(): void {}
  exit() {
    this.store.dispatch(setVisibility({ isVisible: false }));
    this.store.dispatch(addConfirmResult({ result: false }));
  }
}
