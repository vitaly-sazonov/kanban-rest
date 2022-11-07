import { Injectable } from '@angular/core';
import { filter, map, of, switchMap, take, tap } from 'rxjs';
import {
  GetUserByIdResponse,
  UserLogin,
  UserRegistration,
} from 'src/app/interfaces';
import { HttpService } from 'src/app/core/services/http.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Store } from '@ngrx/store';
import { loginUser, logoutUser } from 'src/app/redux/actions/user.actions';
import { Router, UrlTree } from '@angular/router';
import { RouterStateValue } from 'src/app/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // redirectUrl = '';
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

  checkToken(userId: string, url: UrlTree) {
    return this.httpService.getUserById(userId).pipe(
      map(x => {
        if (x.id) {
          this.dispatchUser(x);
          return true;
        }
        return url;
      })
    );
  }

  getUserId() {
    const userId = this.localstorageService.getUserId();
    const token = this.localstorageService.getToken();
    return userId && token ? userId : false;
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
  }
}
