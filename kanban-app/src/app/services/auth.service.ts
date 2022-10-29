import { Injectable } from '@angular/core';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { UserLogin } from '../interfaces';
import { HttpService } from './http.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private localstorageService: LocalstorageService
  ) {}

  login(user: UserLogin) {
    return this.httpService.signIn(user).pipe(
      tap(x => this.localstorageService.setToken(x.token)),
      switchMap(() => this.httpService.getAllUsers()),
      map(x => x.find(x => x.login === user.login))
    );
  }
}
