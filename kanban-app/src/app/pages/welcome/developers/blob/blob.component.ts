import { Component, Input, OnInit } from '@angular/core';
import anime from 'animejs';
import { MS_IN_S, TRANSFORM_SPEED } from 'src/app/constants';
import { getRandValue } from './rand-function';

@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.scss'],
})
export class BlobComponent implements OnInit {
  isFirstAnimation = true;
  animationSpeed = 0;
  firstBlob = '';
  secondBlob = '';
  thirdBlob = '';
  element = '';

  @Input() blobElement!: HTMLElement;

  constructor() {}

  ngOnInit(): void {
    this.element = this.blobElement.classList.value
      .match(/(?:rotate-\d)/)!
      .toString();
    console.log(this.element);
    this.transformCircle();
    setInterval(() => this.transformCircle(), TRANSFORM_SPEED * MS_IN_S);
  }

  updatePath() {
    const cTr = getRandValue();
    return `M${256.066 + cTr[0]},${43.934 + cTr[1]} C${285.363 + cTr[0]},${
      73.231 + cTr[1]
    } ${300.008 + cTr[2]},${111.632 + cTr[3]} ${299.1 + cTr[2]},${
      150.031 + cTr[3]
    } C${299.992 + cTr[2]},${188.409 + cTr[3]} ${285.348 + cTr[4]},${
      226.784 + cTr[5]
    } ${256.066 + cTr[4]},${256.066 + cTr[5]} C${226.777 + cTr[4]},${
      285.355 + cTr[5]
    } ${188.388 + cTr[6]},${299.1 + cTr[7]} ${150.0 + cTr[6]},${
      299.1 + cTr[7]
    } C${111.612 + cTr[6]},${300.0 + cTr[7]} ${73.223 + cTr[8]},${
      285.355 + cTr[9]
    } ${43.934 + cTr[8]},${256.066 + cTr[9]} C${14.648 + cTr[8]},${
      226.78 + cTr[9]
    } ${0.004 + cTr[10]},${188.398 + cTr[11]} ${0.0 + cTr[10]},${
      150.014 + cTr[11]
    } C${-0.004 + cTr[10]},${111.621 + cTr[11]} ${14.641 + cTr[12]},${
      73.227 + cTr[13]
    } ${43.934 + cTr[12]},${43.934 + cTr[13]} C${73.22 + cTr[12]},${
      14.648 + cTr[13]
    } ${111.604 + cTr[14]},${0.003 + cTr[15]} ${149.988 + cTr[14]},${
      0.0 + cTr[15]
    } C${188.38 + cTr[14]},${-0.003 + cTr[15]} ${226.774 + cTr[0]},${
      14.642 + cTr[1]
    } ${256.066 + cTr[0]},${43.934 + cTr[1]} Z`;
  }

  transformCircle() {
    this.firstBlob = this.updatePath();
    this.secondBlob = this.updatePath();
    this.thirdBlob = this.updatePath();

    anime({
      targets: `.${this.element}-blob-1`,
      rotate: {
        value: anime.random(-90, 90),
        duration: anime.random(
          TRANSFORM_SPEED * MS_IN_S,
          TRANSFORM_SPEED * MS_IN_S * 10
        ),
      },
      d: { value: this.firstBlob },
      easing: 'linear',
      duration: TRANSFORM_SPEED * MS_IN_S,
    });

    anime({
      targets: `.${this.element}-blob-2`,
      rotate: {
        value: anime.random(-90, 90),
        duration: anime.random(
          TRANSFORM_SPEED * MS_IN_S,
          TRANSFORM_SPEED * MS_IN_S * 10
        ),
      },
      d: { value: this.secondBlob },
      easing: 'linear',
      delay: (TRANSFORM_SPEED * MS_IN_S) / 2,
      duration: TRANSFORM_SPEED * MS_IN_S,
    });

    anime({
      targets: `.${this.element}-blob-3`,
      rotate: {
        value: anime.random(-90, 90),
        duration: anime.random(
          TRANSFORM_SPEED * MS_IN_S,
          TRANSFORM_SPEED * MS_IN_S * 10
        ),
      },
      d: { value: this.thirdBlob },
      easing: 'linear',
      delay: (TRANSFORM_SPEED * MS_IN_S) / 2,
      duration: TRANSFORM_SPEED * MS_IN_S,
    });
  }
}
