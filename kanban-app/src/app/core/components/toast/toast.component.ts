import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  isVisible?: boolean;
  notification$?: Observable<string>;
  error = 'ERROR';
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notification$ = this.notificationService.getNotification().pipe(
      tap(observable => {
        if (observable) {
          this.isVisible = true;
          setTimeout(() => (this.isVisible = false), 5000);
        }
      })
    );
  }
}
