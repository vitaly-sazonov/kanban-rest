import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalTypes } from 'src/app/enums';
import { setType } from 'src/app/redux/actions/modal.actions';
import { selectModalType } from 'src/app/redux/selectors/modal.selectors';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalType$ = this.store.select(selectModalType);
  constructor(private store: Store) {}

  setType = (type: ModalTypes) =>
    this.store.dispatch(setType({ modalType: type }));

  getType = () => this.modalType$;
}
