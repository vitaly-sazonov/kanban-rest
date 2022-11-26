import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BasketService } from 'src/app/core/services/basket.service';
import { ModalTypes } from 'src/app/enums';
import { Board } from 'src/app/interfaces';
import { addConfirmMessage } from 'src/app/redux/actions/confirm.actions';
import { setType, setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectConfirmationResult } from 'src/app/redux/selectors/confirmation.selectors';
import { selectFeatureIsLoading } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit, OnDestroy {
  basket$$?: BehaviorSubject<Board[]>;
  isLoading$ = this.store.select(selectFeatureIsLoading);
  result$ = this.store.select(selectConfirmationResult);
  subscription1?: Subscription;

  constructor(private basketService: BasketService, private store: Store) {}

  ngOnInit(): void {
    this.basket$$ = this.basketService.getBasket();
  }
  deleteAll() {
    [
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'CONFIRM_CLEAR_BASKET' }),
    ].forEach(action => this.store.dispatch(action));
    this.subscription1 = this.result$.subscribe(data => {
      if (data) {
        this.basketService.deleteAllFromBasket();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
  }
}
