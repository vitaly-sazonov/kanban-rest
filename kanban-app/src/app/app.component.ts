import { Component, OnInit } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ConfirmService } from './core/services/confirm.service';
import { HttpService } from './services/http.service';
import { TranslateService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TITLE';
  userResult?: Observable<boolean>; // it is for tasting the modal window,then it should be deleted
  constructor(
    private translateService: TranslateService,
    private httpService: HttpService,
    private confirmService: ConfirmService // it is for tasting the modal window,then it should be deleted
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

    this.userResult = this.confirmService.getConfirmResult(); // it is for tasting the modal window,then it should be deleted
  }
  callModal(info: string) {
    // it is for tasting the modal window,then this method should be deleted
    this.confirmService.setConfirmInfo('SAMPLE_CONFIRM_INFO');
  }
}
