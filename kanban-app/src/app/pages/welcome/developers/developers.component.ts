import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, tap } from 'rxjs';
import { DEVELOPER, DEVELOPERS } from 'src/app/developers';
import { DEVELOPERS_RU } from 'src/app/developers-ru';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss'],
})
export class DevelopersComponent {
  developers$ = this.translateService.onLangChange.pipe(
    map(x => (x.lang === 'en' ? DEVELOPERS : DEVELOPERS_RU))
  );
  constructor(private translateService: TranslateService) {}
}
