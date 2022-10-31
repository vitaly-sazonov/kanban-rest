import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addConfirmMessage,
  addConfirmResult,
} from 'src/app/redux/actions/confirm.actions';
import {
  selectConfirmationMessage,
  selectConfirmationResult,
} from 'src/app/redux/selectors/confirmation.selectors';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  confirmInfo$ = this.store.select(selectConfirmationMessage);
  confirmResult$ = this.store.select(selectConfirmationResult);
  constructor(private store: Store) {}

  setConfirmInfo(info: string) {
    this.store.dispatch(addConfirmMessage({ message: info }));
  }

  setConfirmResult(result: boolean | null) {
    this.store.dispatch(addConfirmResult({ result }));
  }

  getConfirmResult(): Observable<boolean | null | undefined> {
    return this.confirmResult$;
  }

  getConfirmInfo(): Observable<string | null | undefined> {
    return this.confirmInfo$;
  }
}
