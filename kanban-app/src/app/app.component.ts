import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(translate: TranslateService, private authService: AuthService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
