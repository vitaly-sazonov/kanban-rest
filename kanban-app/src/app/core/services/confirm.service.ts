import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  confirmInfo$$ = new Subject<string>();
  confirmResult$$ = new Subject<boolean>();
  constructor() {}

  setConfirmInfo(info: string) {
    this.confirmInfo$$.next(info);
  }

  setConfirmResult(result: boolean) {
    this.confirmResult$$.next(result);
  }

  getConfirmResult() {
    return this.confirmResult$$.asObservable();
  }

  getConfirmInfo(): Observable<string> {
    return this.confirmInfo$$.asObservable();
  }
}
