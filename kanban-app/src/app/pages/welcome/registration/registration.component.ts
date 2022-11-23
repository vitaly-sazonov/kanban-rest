import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import anime from 'animejs';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ANIMATIONS, ANIMATION_DURATION, user2 } from 'src/app/constants';
import { PreviousRouteService } from 'src/app/core/services/previous-route.service';
import { PasswordValidatorSymbols, RouterStateValue } from 'src/app/enums';
import { UserRegistration } from 'src/app/interfaces';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';
import { passwordValidator } from '../password-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements AfterViewInit, OnDestroy {
  PasswordValidatorSymbols = PasswordValidatorSymbols;
  isLoading$ = this.store.select(selectFeatureIsLoading);
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
    private authService: AuthService,
    private comeFrom: PreviousRouteService
  ) {}

  ngAfterViewInit(): void {
    this.comeFrom
      .getPrevRoute()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        console.log(data);
        if (data === '/welcome/developers') {
          anime({
            targets: `.register-container`,
            ...ANIMATIONS.bottomTopIn,
          });
          anime({
            targets: `.back`,
            ...ANIMATIONS.topBottomIn,
          });
        }
        if (data === '/welcome/login')
          anime({
            targets: `.register-container`,
            ...ANIMATIONS.rightLeftIn,
          });
      });
  }

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

  registerUser() {
    this.register(user2);
  }

  navigate(path: string) {
    this.comeFrom.setPrevRoute(this.router.url);
    if (path === 'welcome/developers') {
      anime({
        targets: `.register-container`,
        ...ANIMATIONS.topBottomOut,
      });
      anime({
        targets: `.back`,
        ...ANIMATIONS.bottomTopOut,
      });
    }
    if (path === 'welcome/login')
      anime({
        targets: `.register-container`,
        ...ANIMATIONS.leftRightOut,
      });
    setTimeout(() => this.router.navigate([path]), ANIMATION_DURATION);
  }
}
