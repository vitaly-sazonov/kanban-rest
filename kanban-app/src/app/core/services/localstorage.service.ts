import { Injectable } from '@angular/core';
import { TOKEN } from '../../constants';

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
}
