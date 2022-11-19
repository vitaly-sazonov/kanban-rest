import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
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
  LocalStorageValues,
  ModalSchemes,
  ModalTypes,
  PercentSize,
  RouterStateValue,
} from 'src/app/enums';
import { setVisibility } from 'src/app/redux/actions/modal.actions';
import { ModalService } from '../services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { LocalstorageService } from '../services/localstorage.service';
import {
  END_GRADIENT,
  GRADIENT_CHANGE_RATIO,
  MAX_HUE_RANGE,
  START_GRADIENT,
} from 'src/app/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLanguage =
    this.localstorageService.getItem(LocalStorageValues.Language) ||
    Language.En;
  language = new FormControl(this.currentLanguage, { nonNullable: true });
  languages = Object.values(Language);
  loginStatus$ = this.store.select(selectFeatureUserLoggedIn);
  mainRoute = '';
  userId = '';
  unsubscribe$ = new Subject();
  deleteMessage = '';
  createBoard = 'CREATE_BOARD';

  @ViewChild('headerElement') header!: ElementRef<HTMLElement>;

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
    this.loginStatus$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => (this.mainRoute = data ? 'boards' : 'welcome'));
    this.language.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => {
        this.currentLanguage = x;
        return this.setLang(x);
      });
    this.store
      .select(selectFeatureUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => (x?.id ? (this.userId = x?.id) : (this.userId = '')));
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.header.nativeElement.style.background = `linear-gradient(90deg, hsla(${
          Math.abs(START_GRADIENT - window.scrollY / GRADIENT_CHANGE_RATIO) %
          MAX_HUE_RANGE
        }, 90%, 50%, 1) 0%, hsla(${
          Math.abs(END_GRADIENT - window.scrollY / GRADIENT_CHANGE_RATIO) %
          MAX_HUE_RANGE
        }, 90%, 50%, 1) 100%)`;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(1);
    this.unsubscribe$.complete();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  setLang(lang: string) {
    this.translateService.use(lang);
    this.localstorageService.setItem(LocalStorageValues.Language, lang);
  }

  callFormModal() {
    this.modalService.setScheme(ModalSchemes.addBoard);
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
