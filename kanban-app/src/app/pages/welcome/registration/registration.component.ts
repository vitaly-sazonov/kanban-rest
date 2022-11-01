import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PasswordValidatorSymbols, RouterStateValue } from 'src/app/enums';
import { UserRegistration } from 'src/app/interfaces';
import { loginUser } from 'src/app/redux/actions/user.actions';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';
import { passwordValidator } from '../password-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnDestroy {
  PasswordValidatorSymbols = PasswordValidatorSymbols;
  isLoading$ = this.store.select(selectFeatureIsLoading);
  unsubscribe$ = new Subject();
  registration = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    login: new FormControl('', {
      validators: [Validators.required, Validators.minLength(7)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(8),
        Validators.required,
        passwordValidator,
      ],
      nonNullable: true,
    }),
  });

  get _password() {
    return this.registration.get('password');
  }

  get _user() {
    return this.registration.get('name');
  }

  get _login() {
    return this.registration.get('login');
  }
  constructor(
    private router: Router,
    private store: Store,
    private authService: AuthService
  ) {}

  goToLogin() {
    this.router.navigate([RouterStateValue.login]);
  }

  register(user: UserRegistration) {
    this.authService
      .registration(user)
      .pipe(
        switchMap(x =>
          this.authService.login({
            login: user.login,
            password: user.password,
          })
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  onSubmit() {
    this.register(this.registration.getRawValue());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
