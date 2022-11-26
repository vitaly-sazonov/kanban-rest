import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SystemSound } from 'src/app/enums';
import { addNotification } from 'src/app/redux/actions/notification.actions';
import { selectNotificationMessage } from 'src/app/redux/selectors/notification.selectors';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification$ = this.store.select(selectNotificationMessage);

  constructor(private store: Store, private audio: AudioService) {}

  setNotification(notification: string) {
    this.store.dispatch(addNotification({ message: notification }));
    this.audio.play(SystemSound.notification);
  }
  getNotification() {
    return this.notification$;
  }
}
