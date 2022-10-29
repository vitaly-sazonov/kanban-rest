import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { HttpService } from './services/http.service';
import { TranslateService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TITLE';
  constructor(
    private translateService: TranslateService,
    private httpService: HttpService
  ) {}

  setLang(lang: string) {
    this.translateService.use(lang);
  }
  ngOnInit(): void {
    this.httpService
      .signIn({
        login: 'user001',
        password: 'userpass@123',
      })
      .pipe(switchMap(() => this.httpService.getAllUsers()))
      .subscribe(x => console.log(x));
  }
}
