import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  switchMap,
  map,
  take,
  tap,
  first,
} from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { Board, Column } from 'src/app/interfaces';
import {
  addColumn,
  loadColumns,
  removeColumn,
} from 'src/app/redux/actions/boards.actions';
import { selectBoardById } from 'src/app/redux/selectors/boards.selectors';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  id: string = '';
  subscription?: Subscription;
  currentBoard$?: Observable<Board | undefined>;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe(data => {
        this.id = data;
        this.store.dispatch(loadColumns({ id: this.id }));
        this.currentBoard$ = this.store.select(selectBoardById(this.id));
      });
  }

  addNewColumn() {
    this.currentBoard$
      ?.pipe(
        map(boardData => {
          if (boardData) {
            this.store.dispatch(
              addColumn({ boardData, column: { title: 'Hello' } })
            );
          }
        }),
        first()
      )
      .subscribe();
  }

  removeColumn(id: string) {
    return this.currentBoard$
      ?.pipe(
        map(boardData => {
          if (boardData)
            this.store.dispatch(removeColumn({ boardData, columnId: id }));
        }),
        first()
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
