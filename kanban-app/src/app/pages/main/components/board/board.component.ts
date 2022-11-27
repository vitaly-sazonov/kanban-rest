import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Sanitizer,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  BOARD_BOTTOM_PADDING,
  BOARD_HEIGHT,
  FOOTER_HEIGHT,
  SPECIAL_SYMBOL,
} from 'src/app/constants';
import { BasketService } from 'src/app/core/services/basket.service';
import { CompareService } from 'src/app/core/services/compare.service';
import { HashService } from 'src/app/core/services/hash.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalSchemes, ModalTypes, RouterStateValue } from 'src/app/enums';
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
export class BoardComponent implements OnDestroy, OnInit, OnChanges {
  subscription?: Subscription;
  @Input() board?: Board;
  @Input() searchRequest: string = '';
  @Input() isAllShort: boolean = false;
  result$ = this.store.select(selectConfirmationResult);
  columns?: Column[];
  length: number | undefined;
  compare = this.compareService;
  isShort = false;
  isExpandUp = false;
  titleReg = new RegExp(`^(.*?)${SPECIAL_SYMBOL}`);
  picReg = new RegExp(`${SPECIAL_SYMBOL}(.*?)$`);
  picPath: string | null = '';

  constructor(
    private store: Store,
    private compareService: CompareService,
    private hash: HashService,
    private storage: LocalstorageService,
    private modalService: ModalService,
    private basket: BasketService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.isShort = this.isAllShort;
  }

  ngOnInit(): void {
    this.columns = this.board?.columns;
    this.length = this.columns!.length;
    this.picPath = this.board?.title!.includes(SPECIAL_SYMBOL)
      ? `url('../../../../../assets/img/boards_thumbnails/${this.board.title
          ?.match(this.picReg)![0]
          .replace(SPECIAL_SYMBOL, '')}.jpg')`
      : null;
    console.log(this.picPath);
  }

  isPreview = false;
  deleteBoard(id: string) {
    this.confirmDelete(id);
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
        this.storage.removeItem(this.board?.id!);
        this.basket.addToBasket(this.board!);
      }
    });
  }

  changeStatus(event: MouseEvent) {
    let maxHeight = document.body.scrollHeight;
    let mousePositionY = event.clientY + window.scrollY;
    let expandUpHeight =
      maxHeight - BOARD_HEIGHT - FOOTER_HEIGHT - BOARD_BOTTOM_PADDING;
    this.isExpandUp = mousePositionY >= expandUpHeight ? true : false;
    this.storage.setItem(
      this.board?.id!,
      this.hash.getHash(JSON.stringify(this.board)).toString()
    );
    this.isPreview = true;
  }

  checkMatching() {
    return this.searchRequest.trim().length > 2
      ? this.board?.columns?.some(
          column =>
            column.title
              .toLowerCase()
              .includes(this.searchRequest.trim().toLowerCase()) ||
            column.tasks?.some(task =>
              task.title
                .toLowerCase()
                .includes(this.searchRequest.trim().toLowerCase())
            )
        )
      : false;
  }

  getTaskQuantity() {
    let q = 0;
    this.columns?.forEach(colomn => (q += colomn.tasks!.length));
    return q;
  }

  editBoard(id: string, title: string, description: string) {
    this.modalService.setExtra([id, title, description]);
    this.modalService.setScheme(ModalSchemes.editBoard);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  editPicture(id: string, title: string, description: string) {
    this.modalService.setExtra([
      id,
      title.includes(SPECIAL_SYMBOL)
        ? title.match(this.titleReg)![0].replace(SPECIAL_SYMBOL, '')
        : title,
      description,
    ]);
    this.modalService.setScheme(ModalSchemes.editPicture);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
