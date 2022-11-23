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
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss'],
})
export class DevelopersComponent implements OnInit, AfterViewInit, OnDestroy {
  unsubscribe$ = new Subject();
  developers = DEVELOPERS;

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
        map(x =>
          x.lang === 'en'
            ? (this.developers = DEVELOPERS)
            : x.lang === 'ru'
            ? (this.developers = DEVELOPERS_RU)
            : (this.developers = DEVELOPERS_BY)
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
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
