import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private translateService: TranslateService,
    private httpService: HttpService
  ) {}

  setLang(lang: string) {
    this.translateService.use(lang);
  }
}
