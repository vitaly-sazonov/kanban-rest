import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  data: any = {};
  constructor(private http: HttpClient) {}
  use(lang: string): Promise<{}> {
    return new Promise<{}>(resolve => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;

      this.http.get(langPath).subscribe(
        response => {
          this.data = response || {};
          resolve(this.data);
        },
        err => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}
