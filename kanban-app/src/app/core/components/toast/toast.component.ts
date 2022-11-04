import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { deleteNotification } from 'src/app/redux/actions/notification.actions';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  isVisible?: boolean;
  notification$?: Observable<string | undefined>;
  error = 'ERROR';
  constructor(
    private notificationService: NotificationService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.notification$ = this.notificationService.getNotification().pipe(
      tap(observable => {
        if (observable) {
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 9000);
          setTimeout(() => {
            this.store.dispatch(deleteNotification());
          }, 10000);
        }
      })
    );
  }
}
