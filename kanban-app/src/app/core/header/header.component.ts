import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Language, ModalTypes } from 'src/app/enums';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { selectFeatureUserLoggedIn } from 'src/app/redux/selectors/user.selectors';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  language = new FormControl(Language.En, { nonNullable: true });
  loginStatus$ = this.store.select(selectFeatureUserLoggedIn);
  unsubscribe$ = new Subject();
  createBoard = 'CREATE_BOARD';

  constructor(
    private translateService: TranslateService,
    private store: Store,
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.language.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.setLang(x));
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

  setLang(lang: string) {
    this.translateService.use(lang);
  }

  callFormModal() {
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  logOut() {
    this.authService.logOut();
  }
}
