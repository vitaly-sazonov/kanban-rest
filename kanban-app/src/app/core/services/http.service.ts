import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  QUERY_PARAMS_FIRST,
  QUERY_PARAMS_SECOND,
  QUERY_PARAMS_THIRD,
} from 'src/app/enums';
import {
  Board,
  Column,
  GetUserByIdResponse,
  LoginResponse,
  Task,
  UserLogin,
  UserRegistration,
} from '../../interfaces';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  getBoards(): Observable<any> {
    return this.http.get(QUERY_PARAMS_FIRST.boards);
  }

  addBoard(board: Board) {
    return this.http.post(QUERY_PARAMS_FIRST.boards, board);
  }

  deleteBoard(id?: string) {
    return this.http.delete(QUERY_PARAMS_FIRST.boards + `/${id}`);
  }

  editBoard(boardId: string, title: string, description: string) {
    return this.http.put(`${QUERY_PARAMS_FIRST.boards}/${boardId}`, {
      title,
      description,
    });
  }
  updateBoard(
    boardId: string,
    title: string,
    description: string,
    columns: Column[]
  ) {
    return this.http.put(`${QUERY_PARAMS_FIRST.boards}/${boardId}`, {
      title,
      description,
      columns,
    });
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

  getBoardById(id: string): Observable<any> {
    return this.http.get(`${QUERY_PARAMS_FIRST.boards}/${id}`);
  }

  addColumn(boardId: string, column: Column) {
    return this.http.post(
      `${QUERY_PARAMS_FIRST.boards}/${boardId}${QUERY_PARAMS_SECOND.columns}`,
      column
    );
  }

  getColumns(id: string): Observable<Column[]> {
    return this.http.get<Column[]>(
      `${QUERY_PARAMS_FIRST.boards}/${id}${QUERY_PARAMS_SECOND.columns}`
    );
  }
  getColumnDetails(boardId: string, columnId: string): Observable<Column> {
    return this.http.get<Column>(
      `${QUERY_PARAMS_FIRST.boards}/${boardId}${QUERY_PARAMS_SECOND.columns}/${columnId}`
    );
  }
  removeColumn(boardId: string, columnId: string) {
    return this.http.delete(
      `${QUERY_PARAMS_FIRST.boards}/${boardId}${QUERY_PARAMS_SECOND.columns}/${columnId}`
    );
  }
  editColumn(
    boardId: string,
    columnId: string,
    columnOrder: number,
    column: Column
  ) {
    return this.http.put(
      `${QUERY_PARAMS_FIRST.boards}/${boardId}${QUERY_PARAMS_SECOND.columns}/${columnId}`,
      { ...column, order: columnOrder }
    );
  }
  getTasks(boardId: string, columnId: string): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${QUERY_PARAMS_FIRST.boards}/${boardId}${QUERY_PARAMS_SECOND.columns}/${columnId}${QUERY_PARAMS_THIRD.tasks}`
    );
  }
  addTask(boardId: string, columnId: string, task: Task): Observable<Task> {
    return this.http.post<Task>(
      `${QUERY_PARAMS_FIRST.boards}/${boardId}${QUERY_PARAMS_SECOND.columns}/${columnId}${QUERY_PARAMS_THIRD.tasks}`,
      task
    );
  }
  editTask(
    boardId: string,
    columnId: string,
    taskId: string,
    task: Task
  ): Observable<Task> {
    console.log();
    return this.http.put<Task>(
      `${QUERY_PARAMS_FIRST.boards}/${boardId}${QUERY_PARAMS_SECOND.columns}/${columnId}${QUERY_PARAMS_THIRD.tasks}/${taskId}`,
      { ...task }
    );
  }
  removeTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(
      `${QUERY_PARAMS_FIRST.boards}/${boardId}${QUERY_PARAMS_SECOND.columns}/${columnId}${QUERY_PARAMS_THIRD.tasks}/${taskId}`
    );
  }
}
