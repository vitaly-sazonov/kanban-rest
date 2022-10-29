import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import {
  selectFeatureUser,
  selectFeatureUserLoggedIn,
  selectUser,
} from 'src/app/redux/selectors/user.selectors';
import { loginUser } from 'src/app/redux/actions/user.actions';
import { GetUserByIdResponse } from 'src/app/interfaces';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  title = 'TITLE';
  user$ = this.store.select(selectFeatureUser);
  name!: GetUserByIdResponse;
  constructor(private authService: AuthService, private store: Store) {}
  ngOnInit(): void {
    this.user$.pipe(map(x => x?.name)).subscribe(x => console.log(x));
  }

  logUser() {
    this.authService
      .login({
        login: 'user001',
        password: 'userpass@123',
      })
      .subscribe(x => {
        if (x) {
          this.name = x;
          this.store.dispatch(loginUser({ user: x }));
        }
      });
  }
}
