import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  confirmInfo$$ = new Subject<string>();
  confirmResult$$ = new Subject<boolean | null>();
  constructor() {}

  setConfirmInfo(info: string) {
    this.confirmInfo$$.next(info);
    this.setConfirmResult(null);
  }

  setConfirmResult(result: boolean | null) {
    this.confirmResult$$.next(result);
  }

  getConfirmResult() {
    return this.confirmResult$$.asObservable();
  }

  getConfirmInfo(): Observable<string> {
    return this.confirmInfo$$.asObservable();
  }
}
