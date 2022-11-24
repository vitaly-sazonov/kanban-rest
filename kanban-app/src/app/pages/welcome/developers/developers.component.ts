import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Subject, takeUntil } from 'rxjs';
import { DEVELOPERS } from 'src/app/developers';
import { DEVELOPERS_BY } from 'src/app/developers-by';
import { DEVELOPERS_RU } from 'src/app/developers-ru';
import { DEVELOPERS_UA } from 'src/app/developers-ua';
import { Language } from 'src/app/enums';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss'],
})
export class DevelopersComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  developers = this.getCurrentDevelopers();

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(
        map(x => {
          switch (x.lang) {
            case Language.En: {
              this.developers = DEVELOPERS;
              break;
            }
            case Language.Ru: {
              this.developers = DEVELOPERS_RU;
              break;
            }
            case Language.By: {
              this.developers = DEVELOPERS_BY;
              break;
            }
            case Language.Ua: {
              this.developers = DEVELOPERS_UA;
              break;
            }
            default:
              this.developers = DEVELOPERS;
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  getCurrentDevelopers() {
    switch (this.translateService.currentLang) {
      case Language.En:
        return DEVELOPERS;
      case Language.Ru:
        return DEVELOPERS_RU;
      case Language.By:
        return DEVELOPERS_BY;
      case Language.Ua:
        return DEVELOPERS_UA;
      default:
        return DEVELOPERS;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
