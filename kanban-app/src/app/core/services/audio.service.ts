import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor() {}
  play(href: string) {
    new Audio(href).play();
  }
}
