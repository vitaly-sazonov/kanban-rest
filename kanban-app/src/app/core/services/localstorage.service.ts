import { Injectable } from '@angular/core';
import { TOKEN, USER_ID } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}
  clear() {
    localStorage.clear();
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    this.setToken('');
  }

  setUserId(id: string) {
    localStorage.setItem(USER_ID, id);
  }

  getUserId() {
    return localStorage.getItem(USER_ID);
  }
}
