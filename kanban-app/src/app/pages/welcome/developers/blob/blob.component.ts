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
  animationInterval!: NodeJS.Timer;
  animationSpeed = 0;
  prevFirstBlob =
    'M270.066,26.933999999999997 C299.363,56.230999999999995 285.008,99.632 284.1,138.031 C284.992,176.409 271.348,235.784 242.06599999999997,265.066 C212.777,294.355 180.388,315.1 142,315.1 C103.612,316 79.223,299.355 49.934,270.066 C20.648,240.78 12.004,203.398 12,165.014 C11.996,126.621 29.641,55.227000000000004 58.934,25.933999999999997 C88.22,-3.3520000000000003 109.604,6.003 147.988,6 C186.38,5.997 240.774,-2.3580000000000005 270.066,26.933999999999997 Z';
  prevSecondBlob =
    'M241.06599999999997,57.934 C270.363,87.231 312.008,110.632 311.1,149.031 C311.992,187.409 278.348,219.784 249.06599999999997,249.06599999999997 C219.777,278.355 170.388,288.1 132,288.1 C93.612,289 74.223,270.355 44.934,241.06599999999997 C15.648,211.78 4.004,190.398 4,152.014 C3.996,113.621 18.641,57.227000000000004 47.934,27.933999999999997 C77.22,-1.3520000000000003 128.60399999999998,-7.997 166.988,-8 C205.38,-8.003 211.774,28.642 241.06599999999997,57.934 Z';
  prevThirdBlob =
    'M271.066,44.934 C300.363,74.231 317.008,127.632 316.1,166.031 C316.992,204.409 292.348,236.784 263.066,266.066 C233.777,295.355 174.388,289.1 136,289.1 C97.612,290 80.223,302.355 50.934,273.066 C21.648,243.78 -7.996,207.398 -8,169.014 C-8.004,130.62099999999998 13.641,80.227 42.934,50.934 C72.22,21.648 102.604,-5.997 140.988,-6 C179.38,-6.003 241.774,15.642 271.066,44.934 Z';
  firstBlob =
    'M271.066,44.934 C300.363,74.231 317.008,127.632 316.1,166.031 C316.992,204.409 292.348,236.784 263.066,266.066 C233.777,295.355 174.388,289.1 136,289.1 C97.612,290 80.223,302.355 50.934,273.066 C21.648,243.78 -7.996,207.398 -8,169.014 C-8.004,130.62099999999998 13.641,80.227 42.934,50.934 C72.22,21.648 102.604,-5.997 140.988,-6 C179.38,-6.003 241.774,15.642 271.066,44.934 Z';
  secondBlob =
    'M270.066,26.933999999999997 C299.363,56.230999999999995 285.008,99.632 284.1,138.031 C284.992,176.409 271.348,235.784 242.06599999999997,265.066 C212.777,294.355 180.388,315.1 142,315.1 C103.612,316 79.223,299.355 49.934,270.066 C20.648,240.78 12.004,203.398 12,165.014 C11.996,126.621 29.641,55.227000000000004 58.934,25.933999999999997 C88.22,-3.3520000000000003 109.604,6.003 147.988,6 C186.38,5.997 240.774,-2.3580000000000005 270.066,26.933999999999997 Z';
  thirdBlob =
    'M241.06599999999997,57.934 C270.363,87.231 312.008,110.632 311.1,149.031 C311.992,187.409 278.348,219.784 249.06599999999997,249.06599999999997 C219.777,278.355 170.388,288.1 132,288.1 C93.612,289 74.223,270.355 44.934,241.06599999999997 C15.648,211.78 4.004,190.398 4,152.014 C3.996,113.621 18.641,57.227000000000004 47.934,27.933999999999997 C77.22,-1.3520000000000003 128.60399999999998,-7.997 166.988,-8 C205.38,-8.003 211.774,28.642 241.06599999999997,57.934 Z';
  element = '';

  @Input() blobElement!: HTMLElement;

  constructor() {}

  ngOnInit(): void {
    this.element = this.blobElement.classList.value
      .match(/(?:rotate-\d)/)!
      .toString();
    this.animationInterval = setInterval(
      () => this.transformCircle(),
      TRANSFORM_SPEED * MS_IN_S
    );
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
    this.prevFirstBlob = this.firstBlob;
    this.prevSecondBlob = this.secondBlob;
    this.prevThirdBlob = this.thirdBlob;
    this.firstBlob = this.updatePath();
    this.secondBlob = this.updatePath();
    this.thirdBlob = this.updatePath();

    anime({
      targets: `.${this.element}-blob-1`,
      translateY: 0,
      rotate: {
        value: anime.random(-90, 90),
        duration: anime.random(
          TRANSFORM_SPEED * MS_IN_S,
          TRANSFORM_SPEED * MS_IN_S * 10
        ),
      },
      d: [{ value: this.prevFirstBlob }, { value: this.firstBlob }],
      easing: 'easeOutQuad',
      duration: anime.random(
        TRANSFORM_SPEED * MS_IN_S,
        TRANSFORM_SPEED * MS_IN_S * 2
      ),
      loop: true,
    });

    anime({
      targets: `.${this.element}-blob-2`,
      translateY: 0,
      rotate: {
        value: anime.random(-90, 90),
        duration: anime.random(
          TRANSFORM_SPEED * MS_IN_S,
          TRANSFORM_SPEED * MS_IN_S * 10
        ),
      },
      d: [{ value: this.prevSecondBlob }, { value: this.secondBlob }],
      easing: 'easeOutQuad',
      duration: anime.random(
        TRANSFORM_SPEED * MS_IN_S,
        TRANSFORM_SPEED * MS_IN_S * 2
      ),
      loop: true,
    });

    anime({
      targets: `.${this.element}-blob-3`,
      translateY: 0,
      rotate: {
        value: anime.random(-90, 90),
        duration: anime.random(
          TRANSFORM_SPEED * MS_IN_S,
          TRANSFORM_SPEED * MS_IN_S * 10
        ),
      },
      d: [{ value: this.prevThirdBlob }, { value: this.thirdBlob }],
      easing: 'easeOutQuad',
      duration: anime.random(
        TRANSFORM_SPEED * MS_IN_S,
        TRANSFORM_SPEED * MS_IN_S * 2
      ),
      loop: true,
    });
  }
}
