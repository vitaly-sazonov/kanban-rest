import { Injectable } from '@angular/core';
import { map, switchMap, takeUntil, tap } from 'rxjs';
import { UserLogin } from 'src/app/interfaces';
import { HttpService } from 'src/app/core/services/http.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Store } from '@ngrx/store';
import { loginUser, logoutUser } from 'src/app/redux/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private localstorageService: LocalstorageService,
    private store: Store
  ) {}

  login(user: UserLogin) {
    return this.httpService.signIn(user).pipe(
      tap(x => this.localstorageService.setToken(x.token)),
      switchMap(() => this.getUser(user.login))
    );
  }

  getUser(userName: string) {
    return this.httpService
      .getAllUsers()
      .pipe(map(x => x.find(x => x.login === userName)));
  }

  logOut() {
    this.store.dispatch(logoutUser());
    this.localstorageService.clearToken();
  }
}
