import { Injectable } from '@angular/core';
import { filter, map, switchMap, take, tap } from 'rxjs';
import {
  GetUserByIdResponse,
  UserLogin,
  UserRegistration,
} from 'src/app/interfaces';
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
  redirectUrl = '';
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
      filter(Boolean),
      tap(x => {
        this.router.navigate([RouterStateValue.main]);
        this.dispatchUser(x);
      })
    );
  }

  registration(user: UserRegistration) {
    return this.httpService.signUp(user);
  }

  editUser(id: string, user: UserRegistration) {
    return this.httpService
      .putUser(id, user)
      .pipe(tap(x => this.dispatchUser(x)));
  }

  getUser(userName: string) {
    return this.httpService.getAllUsers().pipe(
      map(x => x.find(x => x.login === userName)),
      tap(x => {
        if (x?.id) this.localstorageService.setUserId(x?.id);
      })
    );
  }

  checkToken() {
    const userId = this.localstorageService.getUserId();
    const token = this.localstorageService.getToken();
    if (userId && token) {
      this.httpService
        .getUserById(userId)
        .pipe(take(1))
        .subscribe(x => {
          this.dispatchUser(x);
        });
    }
  }

  logOut() {
    this.store.dispatch(logoutUser());
    this.localstorageService.clear();
    this.router.navigate([RouterStateValue.welcome]);
  }

  deleteUser(userId: string) {
    return this.httpService.deleteUser(userId);
  }

  dispatchUser(x: GetUserByIdResponse) {
    this.store.dispatch(loginUser({ user: x }));
    this.router.navigate([this.redirectUrl]);
  }
}
