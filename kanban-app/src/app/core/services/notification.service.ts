import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addNotification } from 'src/app/redux/actions/notification.actions';
import { selectNotificationMessage } from 'src/app/redux/selectors/notification.selectors';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification$ = this.store.select(selectNotificationMessage);

  constructor(private store: Store) {}

  setNotification(notification: string) {
    this.store.dispatch(addNotification({ message: notification }));
  }
  getNotification() {
    return this.notification$;
  }
}
