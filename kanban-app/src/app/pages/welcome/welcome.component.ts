import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFeatureUser } from 'src/app/redux/selectors/user.selectors';
import { loginUser } from 'src/app/redux/actions/user.actions';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  title = 'TITLE';
  user$ = this.store.select(selectFeatureUser);
  constructor(private authService: AuthService, private store: Store) {}

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
}
