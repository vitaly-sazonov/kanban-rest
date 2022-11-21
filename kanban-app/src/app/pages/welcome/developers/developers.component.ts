import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Subject, takeUntil } from 'rxjs';
import {
  MAX_CIRCLE_TRANSFORM,
  MS_IN_S,
  ROTATE_SPEED,
  TRANSFORM_SPEED,
} from 'src/app/constants';
import { DEVELOPERS } from 'src/app/developers';
import { DEVELOPERS_BY } from 'src/app/developers-by';
import { DEVELOPERS_RU } from 'src/app/developers-ru';
import anime from 'animejs';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss'],
})
export class DevelopersComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  developers = DEVELOPERS;
  cTrV = MAX_CIRCLE_TRANSFORM;
  modifier: number[] = [];

  constructor(private translateService: TranslateService) {}

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
    setInterval(() => this.rotateBlobs(), 3000);
  }

  rotateBlobs() {
    anime({
      targets: '.rotate-1',
      rotate: {
        value: anime.random(-180, 180),
        duration: anime.random(
          ROTATE_SPEED * MS_IN_S,
          ROTATE_SPEED * MS_IN_S * 10
        ),
        easing: 'linear',
      },
    });
    anime({
      targets: '.rotate-2',
      rotate: {
        value: anime.random(-180, 180),
        duration: anime.random(
          ROTATE_SPEED * MS_IN_S,
          ROTATE_SPEED * MS_IN_S * 10
        ),
        easing: 'linear',
      },
    });
    anime({
      targets: '.rotate-3',
      rotate: {
        value: anime.random(-180, 180),
        duration: anime.random(
          ROTATE_SPEED * MS_IN_S,
          ROTATE_SPEED * MS_IN_S * 10
        ),
        easing: 'linear',
      },
    });
    anime({
      targets: '.rotate-4',
      rotate: {
        value: anime.random(-180, 180),
        duration: anime.random(
          ROTATE_SPEED * MS_IN_S,
          ROTATE_SPEED * MS_IN_S * 10
        ),
        easing: 'linear',
      },
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }
}
