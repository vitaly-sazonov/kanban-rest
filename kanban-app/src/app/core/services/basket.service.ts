import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { BASKET } from 'src/app/constants';
import { SystemSound } from 'src/app/enums';
import { Board } from 'src/app/interfaces';
import { AudioService } from './audio.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(
    private storage: LocalstorageService,
    private store: Store,
    private audioService: AudioService
  ) {}
  basket$$ = new BehaviorSubject<Board[]>([]);
  getBasket() {
    const data = this.storage.getItem(BASKET);
    if (data) {
      this.basket$$.next(JSON.parse(data));
    } else {
      this.storage.setItem(BASKET, '[]');
      this.basket$$.next([]);
    }
    return this.basket$$;
  }
  addToBasket(board: Board) {
    if (this.storage.getItem(BASKET)) {
      let basket = JSON.parse(this.storage.getItem(BASKET)!);
      basket?.push(board);
      this.storage.setItem(BASKET, JSON.stringify(basket));
      this.getBasket();
    } else {
      this.storage.setItem(BASKET, '[]');
    }
  }
  deleteFromBasket(id: string) {
    let basket = JSON.parse(this.storage.getItem(BASKET)!);
    basket = basket.filter((board: Board) => board.id !== id);
    this.storage.setItem(BASKET, JSON.stringify(basket));
    this.getBasket();
  }
  deleteAllFromBasket() {
    this.storage.setItem(BASKET, '[]');
    this.audioService.play(SystemSound.delete);
    this.getBasket();
  }
}
