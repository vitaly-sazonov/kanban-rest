import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, fromEvent, pipe, Subject, take, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  selectFeatureUser,
  selectFeatureUserLoggedIn,
} from 'src/app/redux/selectors/user.selectors';
import { ConfirmService } from '../services/confirm.service';
import { Language, ModalTypes } from 'src/app/enums';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerFixed = false;
  language = new FormControl(Language.En, { nonNullable: true });
  loginStatus$ = this.store.select(selectFeatureUserLoggedIn);
  userId = '';
  unsubscribe$ = new Subject();
  deleteMessage = '';
  createBoard = 'CREATE_BOARD';

  constructor(
    private translateService: TranslateService,
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private confirmService: ConfirmService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (window.scrollY > 0) {
          this.headerFixed = true;
        } else {
          this.headerFixed = false;
        }
      });
    this.language.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => this.setLang(x));
    this.store
      .select(selectFeatureUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => (x?.id ? (this.userId = x?.id) : (this.userId = '')));
    this.confirmService
      .getConfirmResult()
      .pipe(
        filter(x => x === true),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => this.deleteUser());
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

  editUser() {
    this.router.navigate(['/edit']);
  }

  openConfirmWindow() {
    this.translateService
      .get('DeleteUserQuestion')
      .pipe(
        tap(x => (this.deleteMessage = x)),
        take(1)
      )
      .subscribe(x => {
        this.confirmService.setConfirmInfo(this.deleteMessage);
      });
  }

  deleteUser() {
    this.authService
      .deleteUser(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
    this.authService.logOut();
  }
}
