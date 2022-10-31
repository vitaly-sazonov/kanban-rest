import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification$$ = new BehaviorSubject<string>('');
  constructor() {}

  setNotification(notification: string) {
    this.notification$$.next(notification);
  }
  getNotification() {
    return this.notification$$.asObservable();
  }
}
