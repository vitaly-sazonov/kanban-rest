import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFeatureUser } from 'src/app/redux/selectors/user.selectors';
import { loginUser } from 'src/app/redux/actions/user.actions';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  userResult?: Observable<boolean | null>; // it is for testing the modal window,then it should be deleted
  title = 'TITLE';
  user$ = this.store.select(selectFeatureUser);
  constructor(
    private authService: AuthService,
    private store: Store,
    private confirmService: ConfirmService, // it is for testing the modal window,then it should be deleted)
    private notificationService: NotificationService // it is for testing the toast,then it should be deleted)
  ) {}
  ngOnInit(): void {
    this.userResult = this.confirmService.getConfirmResult(); // it is for testing the modal window,then it should be deleted
  }

  logUser() {
    this.authService
      .login({
        login: 'user001',
        password: 'userpass@123',
      })
      .subscribe(x => {
        if (x) {
          this.store.dispatch(loginUser({ user: x }));
        }
      });
  }
  // it is for testing the modal window,then this method should be deleted
  callModal(info: string) {
    this.confirmService.setConfirmInfo('SAMPLE_CONFIRM_INFO');
  }
  // it is for testing the toast,then this method should be deleted
  emitNotification(notification: string) {
    this.notificationService.setNotification(notification);
  }
}
