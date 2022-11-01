import { Injectable } from '@angular/core';
import { map, switchMap, takeUntil, tap } from 'rxjs';
import { UserLogin, UserRegistration } from 'src/app/interfaces';
import { HttpService } from 'src/app/core/services/http.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Store } from '@ngrx/store';
import { loginUser, logoutUser } from 'src/app/redux/actions/user.actions';
import { Router } from '@angular/router';
import { RouterStateValue } from 'src/app/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private localstorageService: LocalstorageService,
    private store: Store,
    private router: Router
  ) {}

  login(user: UserLogin) {
    return this.httpService.signIn(user).pipe(
      tap(x => this.localstorageService.setToken(x.token)),
      switchMap(() => this.getUser(user.login)),
      tap(x => {
        if (x) this.store.dispatch(loginUser({ user: x }));
        this.router.navigate([RouterStateValue.main]);
      })
    );
  }

  registration(user: UserRegistration) {
    return this.httpService.signUp(user);
  }

  getUser(userName: string) {
    return this.httpService
      .getAllUsers()
      .pipe(map(x => x.find(x => x.login === userName)));
  }

  logOut() {
    this.store.dispatch(logoutUser());
    this.localstorageService.clearToken();
    this.router.navigate([RouterStateValue.login]);
  }
}
