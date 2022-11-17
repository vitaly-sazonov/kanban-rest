import { Injectable } from '@angular/core';
import { LocalStorageValues } from 'src/app/enums';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  clear() {
    this.setToken('');
    this.setUserId('');
  }

  setToken(token: string) {
    this.setItem(LocalStorageValues.Token, token);
  }

  getToken() {
    return localStorage.getItem(LocalStorageValues.Token);
  }

  setUserId(id: string) {
    this.setItem(LocalStorageValues.UserId, id);
  }

  getUserId() {
    return localStorage.getItem(LocalStorageValues.UserId);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
