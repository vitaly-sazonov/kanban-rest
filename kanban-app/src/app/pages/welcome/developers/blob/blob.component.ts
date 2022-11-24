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
    return getRandValue();
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
      easing: 'linear',
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
      easing: 'linear',
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
      easing: 'linear',
      duration: anime.random(
        TRANSFORM_SPEED * MS_IN_S,
        TRANSFORM_SPEED * MS_IN_S * 2
      ),
      loop: true,
    });
  }
}
