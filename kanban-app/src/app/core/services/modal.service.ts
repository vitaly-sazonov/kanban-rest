import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { ModalSchemes, ModalTypes } from 'src/app/enums';
import { setScheme, setType } from 'src/app/redux/actions/modal.actions';
import { selectModalType } from 'src/app/redux/selectors/modal.selectors';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalType$ = this.store.select(selectModalType);
  private extraPayload = new BehaviorSubject<any[]>([]);
  extra$ = this.extraPayload.asObservable();
  constructor(private store: Store) {}

  setExtra(payload: any[]) {
    this.extraPayload.next(payload);
  }

  setScheme(scheme: ModalSchemes) {
    this.store.dispatch(setScheme({ modalScheme: scheme }));
  }

  setType = (type: ModalTypes) =>
    this.store.dispatch(setType({ modalType: type }));

  getType = () => this.modalType$;
}
