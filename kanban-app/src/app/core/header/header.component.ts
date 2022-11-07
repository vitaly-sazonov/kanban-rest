import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  selectFeatureUser,
  selectFeatureUserLoggedIn,
} from 'src/app/redux/selectors/user.selectors';
import { ConfirmService } from '../services/confirm.service';
import {
  ConfirmQuestions,
  Language,
  LocalStorageValues,
  ModalTypes,
  PercentSize,
  RouterStateValue,
} from 'src/app/enums';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { ModalService } from '../services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerFixed = false;
  currentLanguage =
    this.localstorageService.getItem(LocalStorageValues.Language) ||
    Language.En;
  language = new FormControl(this.currentLanguage, { nonNullable: true });
  loginStatus$ = this.store.select(selectFeatureUserLoggedIn);
  userId = '';
  unsubscribe$ = new Subject();
  deleteMessage = '';
  createBoard = 'CREATE_BOARD';

  constructor(
    private localstorageService: LocalstorageService,
    private translateService: TranslateService,
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    public dialog: MatDialog
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

  setLang(lang: string) {
    this.translateService.use(lang);
    this.localstorageService.setItem(LocalStorageValues.Language, lang);
  }

  callFormModal() {
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
    this.router.navigate([RouterStateValue.main]);
  }

  logOut() {
    this.authService.logOut();
  }

  editUser() {
    this.router.navigate([RouterStateValue.welcome, RouterStateValue.edit]);
  }

  deleteUserService() {
    return this.authService.deleteUser(this.userId).pipe(
      tap(() => this.authService.logOut()),
      takeUntil(this.unsubscribe$)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog',
      enterAnimationDuration: '500ms',
      width: PercentSize.eighty,
      height: PercentSize.eighty,
      data: ConfirmQuestions.DeleteUserQuestion,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUserService().subscribe();
      }
    });
  }
}
