import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CompareService } from 'src/app/core/services/compare.service';
import { HashService } from 'src/app/core/services/hash.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ModalTypes } from 'src/app/enums';
import { Board, Column } from 'src/app/interfaces';
import {
  addCurrentBoardId,
  deleteAllBoards,
  deleteBoardById,
} from 'src/app/redux/actions/boards.actions';
import { addConfirmMessage } from 'src/app/redux/actions/confirm.actions';
import { setType, setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectConfirmationResult } from 'src/app/redux/selectors/confirmation.selectors';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnDestroy, OnInit {
  subscription?: Subscription;
  @Input() board?: Board;
  @Input() searchRequest: string = '';
  result$ = this.store.select(selectConfirmationResult);
  columns?: Column[];
  length: number | undefined;
  compare = this.compareService;

  constructor(
    private store: Store,
    private compareService: CompareService,
    private hash: HashService,
    private storage: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.columns = this.board?.columns;
    this.length = this.columns!.length;
  }

  isPreview = false;
  deleteBoard(id: string) {
    this.confirmDelete(id);
    this.storage.removeItem(this.board?.id!);
  }

  confirmDelete(id: string) {
    [
      addCurrentBoardId({ id }),
      setType({ modalType: ModalTypes.ConfirmType }),
      setVisibility({ isVisible: true }),
      addConfirmMessage({ message: 'CONFIRM_DELETE' }),
    ].forEach(action => this.store.dispatch(action));

    this.subscription = this.result$.subscribe(data => {
      if (data) {
        [deleteAllBoards(), deleteBoardById({ id })].forEach(action =>
          this.store.dispatch(action)
        );
      }
    });
  }
  toggle() {
    this.isPreview = !this.isPreview;
  }
  changeStatus() {
    this.storage.setItem(
      this.board?.id!,
      this.hash.getHash(JSON.stringify(this.board)).toString()
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
