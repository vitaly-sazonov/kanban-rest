import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectFeatureIsLoading,
  selectFeatureUser,
  selectFeatureUserLoggedIn,
} from 'src/app/redux/selectors/user.selectors';
import { loginUser } from 'src/app/redux/actions/user.actions';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Observable, tap } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router, RouterLink } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  userResult?: Observable<boolean | null | undefined>; // it is for testing the modal window,then it should be deleted
  user$ = this.store.select(selectFeatureUser);
  isLoading$ = this.store.select(selectFeatureIsLoading);
  loginStatus$ = this.store.select(selectFeatureUserLoggedIn);

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
    private confirmService: ConfirmService // it is for testing the modal window,then it should be deleted) // private toastr: ToastrService
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
          this.router.navigate(['main']);
        }
      });
  }

  toastAdd() {
    // this.toastr.success('You are logged in');
    // this.toastr.error('Server error');
  }
}
