import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PasswordValidatorSymbols, RouterStateValue } from 'src/app/enums';
import { UserRegistration } from 'src/app/interfaces';
import {
  selectFeatureIsLoading,
  selectFeatureUser,
} from 'src/app/redux/selectors/user.selectors';
import { passwordValidator } from '../password-validator';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit, OnDestroy {
  PasswordValidatorSymbols = PasswordValidatorSymbols;
  isLoading$ = this.store.select(selectFeatureIsLoading);
  user$ = this.store.select(selectFeatureUser);
  userId = '';
  unsubscribe$ = new Subject();
  registration = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(4)],
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

  ngOnInit(): void {
    this.user$.subscribe(x => {
      if (x) {
        this.userId = x.id;
        this.registration.setValue({
          name: x?.name,
          login: x?.login,
          password: '',
        });
      }
    });
  }

  goToLogin() {
    this.router.navigate([RouterStateValue.login]);
  }

  register(user: UserRegistration) {
    this.authService
      .editUser(this.userId, user)
      .pipe(takeUntil(this.unsubscribe$))
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
