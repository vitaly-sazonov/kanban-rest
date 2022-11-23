import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import anime from 'animejs';
import { delay, map, Subject, takeUntil } from 'rxjs';
import { ANIMATIONS, ANIMATION_DURATION } from 'src/app/constants';
import { PreviousRouteService } from 'src/app/core/services/previous-route.service';
import { DEVELOPERS } from 'src/app/developers';
import { DEVELOPERS_BY } from 'src/app/developers-by';
import { DEVELOPERS_RU } from 'src/app/developers-ru';
import { DEVELOPERS_UA } from 'src/app/developers-ua';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss'],
})
export class DevelopersComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$ = new Subject();
  developers = this.getCurrentDevelopers();

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private comeFrom: PreviousRouteService
  ) {}
  ngAfterViewInit(): void {
    anime({
      targets: `.welcome-wrapper`,
      ...ANIMATIONS.topBottomIn,
    });
  }

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(
        map(x => {
          switch (x.lang) {
            case 'en': {
              this.developers = DEVELOPERS;
              break;
            }
            case 'ru': {
              this.developers = DEVELOPERS_RU;
              break;
            }
            case 'by': {
              this.developers = DEVELOPERS_BY;
              break;
            }
            case 'ua': {
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

  getCurrentDevelopers(){
    switch ( this.translateService.currentLang) {
      case 'en': 
        return DEVELOPERS;
      case 'ru': 
        return DEVELOPERS_RU;  
      case 'by': 
       return DEVELOPERS_BY;
      case 'ua': 
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
    this.comeFrom.setPrevRoute(this.router.url);
    anime({
      targets: `.welcome-wrapper`,
      ...ANIMATIONS.bottomTopOut,
    });
    setTimeout(() => this.router.navigate([route]), ANIMATION_DURATION);
  }
}
