import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QUERY_PARAMS_FIRST } from 'src/app/enums';
import {
  Board,
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

  addBoard(board: Board) {
    return this.http.post(QUERY_PARAMS_FIRST.boards, board);
  }

  deleteBoard(id?: string) {
    return this.http.delete(QUERY_PARAMS_FIRST.boards + `/${id}`);
  }

  signIn(user: UserLogin) {
    return this.http.post<LoginResponse>(QUERY_PARAMS_FIRST.signin, user);
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
}
