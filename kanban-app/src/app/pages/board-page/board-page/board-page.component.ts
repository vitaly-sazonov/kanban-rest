import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalTypes } from 'src/app/enums';
import { addColumn } from 'src/app/redux/actions/columns.actions';
import { setVisibility } from 'src/app/redux/actions/modal.actions';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  id: string = '';
  subscription?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe(data => (this.id = data));
  }

  addColumn() {
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
    this.store.dispatch(addColumn({ column: { title: 'Hello' } }));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
