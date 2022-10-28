import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { APP_URL } from '../constants';
import { LoginResponse, UserLogin } from '../interfaces';
import { LocalstorageService } from './localstorage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    responseType: 'text',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) {}
  getHello() {
    return this.http.get('', httpOptions);
  }

  loginUser(user: UserLogin) {
    return this.http
      .post<LoginResponse>('signin', user, httpOptions)
      .pipe(tap(x => this.localstorageService.setToken(x.token)));
  }

  getAllUsers() {
    return this.http.get('users');
  }
}
