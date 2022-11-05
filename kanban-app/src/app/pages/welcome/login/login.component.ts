import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PasswordValidatorSymbols, RouterStateValue } from 'src/app/enums';
import { UserLogin } from 'src/app/interfaces';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';
import { passwordValidator } from '../password-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  unsubscribe$ = new Subject();
  isLoading$ = this.store.select(selectFeatureIsLoading);
  login = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
      passwordValidator,
    ]),
  });
  PasswordValidatorSymbols = PasswordValidatorSymbols;

  get _password() {
    return this.login.get('password');
  }

  get _user() {
    return this.login.get('userName');
  }
  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  logIn(user: UserLogin) {
    this.authService.login(user).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  logOut() {
    this.authService.logOut();
  }

  onSubmit() {
    const userName = this.login.value.userName;
    const password = this.login.value.password;
    if (userName && password)
      this.logIn({ password: password, login: userName });
  }

  goToRegistration() {
    this.router.navigate([RouterStateValue.registration]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

  // only for login in test
  loginUser() {
    this.authService
      .login({ login: 'user002', password: 'userpass@123' })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }
  // only for login in test
}
