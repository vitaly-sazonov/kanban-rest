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
  getItem(key: string): string | null {
    const value: string | null = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
