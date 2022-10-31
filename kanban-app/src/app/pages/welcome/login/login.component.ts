import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
// import { PasswordValidatorSymbols } from 'src/app/constants';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PasswordValidatorSymbols, RouterStateValue } from 'src/app/enums';
import { UserLogin } from 'src/app/interfaces';
import { loginUser } from 'src/app/redux/actions/user.actions';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  unsubscribe$ = new Subject();
  isLoading$ = this.store.select(selectFeatureIsLoading);
  login = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
      this.passwordValidator,
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
    private router: Router // private spinnerService: SpinnerService
  ) {}

  logIn(user: UserLogin) {
    this.authService
      .login(user)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        if (x) this.store.dispatch(loginUser({ user: x }));
        this.router.navigate([RouterStateValue.main]);
        // this.spinnerService.requestEnded(SpinnerStateName.login);
      });
  }

  logOut() {
    this.authService.logOut();
  }

  onSubmit() {
    const userName = this.login.value.password;
    const password = this.login.value.password;
    if (userName && password)
      // this.spinnerService.requestStarted(SpinnerStateName.login);
      this.logIn({ password: password, login: userName });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } | null {
    const upperCase = new RegExp('[A-Z]');
    const lowerCase = new RegExp('[a-z]');
    const numbers = new RegExp('[0-9]');
    const special = new RegExp('[*@!#%&()^~{}]');
    let obj: { [s: string]: boolean } = {};
    if (!control.value.match(upperCase))
      obj[PasswordValidatorSymbols.upperCase] = true;
    if (!control.value.match(lowerCase))
      obj[PasswordValidatorSymbols.lowerCase] = true;
    if (!control.value.match(numbers))
      obj[PasswordValidatorSymbols.numbers] = true;
    if (!control.value.match(special))
      obj[PasswordValidatorSymbols.special] = true;
    if (Object.keys(obj).length === 0) return null;
    return obj;
  }
}
