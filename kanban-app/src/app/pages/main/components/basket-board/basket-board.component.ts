import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/core/services/basket.service';
import { ModalTypes } from 'src/app/enums';
import { Board } from 'src/app/interfaces';
import { restoreBoard } from 'src/app/redux/actions/boards.actions';
import { addConfirmMessage } from 'src/app/redux/actions/confirm.actions';
import { setType, setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectConfirmationResult } from 'src/app/redux/selectors/confirmation.selectors';

@Component({
  selector: 'app-basket-board',
  templateUrl: './basket-board.component.html',
  styleUrls: ['./basket-board.component.scss'],
})
export class BasketBoardComponent implements OnDestroy {
  @Input() board?: Board;
  result$ = this.store.select(selectConfirmationResult);
  subscription1?: Subscription;
  subscription2?: Subscription;

  constructor(private basketService: BasketService, private store: Store) {}

  restoreBoardFromBasket(id: string) {
    [
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'CONFIRM_RESTORE_BOARD' }),
    ].forEach(action => this.store.dispatch(action));
    this.subscription2 = this.result$.subscribe(data => {
      if (data) {
        this.store.dispatch(restoreBoard({ board: this.board! }));
        this.basketService.deleteFromBasket(id);
      }
    });
  }

  deleteBoardFromBasket(id: string) {
    [
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'CONFIRM_DELETE' }),
    ].forEach(action => this.store.dispatch(action));
    this.subscription1 = this.result$.subscribe(data => {
      if (data) {
        this.basketService.deleteFromBasket(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }
}
