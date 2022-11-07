import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { QUERY_PARAMS_FIRST } from 'src/app/enums';
import {
  Board,
  Column,
  GetUserByIdResponse,
  LoginResponse,
  UserLogin,
  UserRegistration,
} from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<any> {
    return this.http.get(QUERY_PARAMS_FIRST.boards);
  }

  getColumns(id?: string): Observable<any> {
    return this.http.get(QUERY_PARAMS_FIRST.boards + `/${id}/columns`);
  }

  getBoardById(id?: string) {
    return this.http.get(QUERY_PARAMS_FIRST.boards + `/${id}`);
  }

  addBoard(board: Board) {
    return this.http.post(QUERY_PARAMS_FIRST.boards, board);
  }

  deleteBoard(id?: string) {
    return this.http.delete(QUERY_PARAMS_FIRST.boards + `/${id}`);
  }

  signIn(user: UserLogin) {
    return this.http
      .post<LoginResponse>(QUERY_PARAMS_FIRST.signin, user)
      .pipe(catchError(error => this.handleError(error)));
  }

  signUp(user: UserRegistration) {
    return this.http.post<GetUserByIdResponse>(QUERY_PARAMS_FIRST.signup, user);
  }

  getAllUsers() {
    return this.http.get<GetUserByIdResponse[]>(QUERY_PARAMS_FIRST.users);
  }

  getUserById(id: string) {
    return this.http.get<GetUserByIdResponse>(
      QUERY_PARAMS_FIRST.users + '/' + id
    );
  }

  deleteUser(id: string) {
    return this.http.delete(QUERY_PARAMS_FIRST.users + '/' + id);
  }

  putUser(id: string, user: UserLogin) {
    return this.http.put<GetUserByIdResponse>(
      QUERY_PARAMS_FIRST.users + '/' + id,
      user
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
