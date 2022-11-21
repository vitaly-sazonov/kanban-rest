import { Component, Input, OnInit } from '@angular/core';
import anime from 'animejs';
import {
  MAX_CIRCLE_TRANSFORM,
  MS_IN_S,
  TRANSFORM_SPEED,
} from 'src/app/constants';
import { getRandValue } from './rand-function';

@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.scss'],
})
export class BlobComponent implements OnInit {
  currSvgCircle = '';
  nextSvgCircle = '';
  cTrV = MAX_CIRCLE_TRANSFORM;
  cTr = new Array(16).fill(0);
  element = '';

  @Input() blobElement!: HTMLElement;

  constructor() {}

  ngOnInit(): void {
    this.element = this.blobElement.classList[0];
    this.transformCircle();
    setInterval(() => this.transformCircle(), TRANSFORM_SPEED * MS_IN_S);
  }

  updatePath() {
    this.cTr = getRandValue();
    return `M${256.066 + this.cTr[0]},${43.934 + this.cTr[1]} C${
      285.363 + this.cTr[0]
    },${73.231 + this.cTr[1]} ${300.008 + this.cTr[2]},${
      111.632 + this.cTr[3]
    } ${299.1 + this.cTr[2]},${150.031 + this.cTr[3]} C${
      299.992 + this.cTr[2]
    },${188.409 + this.cTr[3]} ${285.348 + this.cTr[4]},${
      226.784 + this.cTr[5]
    } ${256.066 + this.cTr[4]},${256.066 + this.cTr[5]} C${
      226.777 + this.cTr[4]
    },${285.355 + this.cTr[5]} ${188.388 + this.cTr[6]},${
      299.1 + this.cTr[7]
    } ${150.0 + this.cTr[6]},${299.1 + this.cTr[7]} C${111.612 + this.cTr[6]},${
      300.0 + this.cTr[7]
    } ${73.223 + this.cTr[8]},${285.355 + this.cTr[9]} ${
      43.934 + this.cTr[8]
    },${256.066 + this.cTr[9]} C${14.648 + this.cTr[8]},${
      226.78 + this.cTr[9]
    } ${0.004 + this.cTr[10]},${188.398 + this.cTr[11]} ${0.0 + this.cTr[10]},${
      150.014 + this.cTr[11]
    } C${-0.004 + this.cTr[10]},${111.621 + this.cTr[11]} ${
      14.641 + this.cTr[12]
    },${73.227 + this.cTr[13]} ${43.934 + this.cTr[12]},${
      43.934 + this.cTr[13]
    } C${73.22 + this.cTr[12]},${14.648 + this.cTr[13]} ${
      111.604 + this.cTr[14]
    },${0.003 + this.cTr[15]} ${149.988 + this.cTr[14]},${
      0.0 + this.cTr[15]
    } C${188.38 + this.cTr[14]},${-0.003 + this.cTr[15]} ${
      226.774 + this.cTr[0]
    },${14.642 + this.cTr[1]} ${256.066 + this.cTr[0]},${
      43.934 + this.cTr[1]
    } Z`;
  }

  transformCircle() {
    this.currSvgCircle = this.updatePath();
    this.nextSvgCircle = this.updatePath();

    anime({
      targets: `.${this.element}-blob-1`,
      rotate: {
        value: anime.random(-90, 90),
        duration: anime.random(
          TRANSFORM_SPEED * MS_IN_S,
          TRANSFORM_SPEED * MS_IN_S * 10
        ),
        easing: 'linear',
        loop: true,
      },
      d: { value: this.nextSvgCircle },
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
        easing: 'linear',
        loop: true,
      },
      d: { value: this.currSvgCircle },
      easing: 'linear',
      delay: (TRANSFORM_SPEED * MS_IN_S) / 2,
      duration: TRANSFORM_SPEED * MS_IN_S,
    });
  }
}
