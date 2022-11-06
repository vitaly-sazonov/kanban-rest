import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  selectFeatureUser,
  selectFeatureUserLoggedIn,
} from 'src/app/redux/selectors/user.selectors';
import {
  ConfirmQuestions,
  Language,
  ModalSchemes,
  ModalTypes,
  PercentSize,
  RouterStateValue,
} from 'src/app/enums';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { ModalService } from '../services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

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
  }

  callFormModal() {
    this.modalService.setScheme(ModalSchemes.addBoard);
    this.modalService.setType(ModalTypes.FormType);
    this.store.dispatch(setVisibility({ isVisible: true }));
  }

  logOut() {
    this.authService.logOut();
  }

  editUser() {
    this.router.navigate([RouterStateValue.edit]);
  }

  deleteUserService() {
    return this.authService.deleteUser(this.userId).pipe(
      tap(() => this.authService.logOut()),
      takeUntil(this.unsubscribe$)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
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
