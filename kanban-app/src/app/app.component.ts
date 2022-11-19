import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalstorageService } from './core/services/localstorage.service';
import { Language, LocalStorageValues } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    translate: TranslateService,
    localstorageService: LocalstorageService
  ) {
    translate.addLangs([Language.En, Language.Ru, Language.By, Language.Ua]);
    translate.setDefaultLang(Language.En);
    const language =
      localstorageService.getItem(LocalStorageValues.Language) ?? Language.En;
    translate.use(language);
  }
}
