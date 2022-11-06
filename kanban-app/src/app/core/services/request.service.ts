import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly userRequest$$ = new BehaviorSubject<string>('');

  constructor() {}

  setRequest(request: string) {
    if (request.trim().length >= 1) {
      this.userRequest$$.next(request);
    } else {
      this.userRequest$$.next('');
    }
  }

  getRequest() {
    return this.userRequest$$.asObservable();
  }
}
