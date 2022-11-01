import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Language } from 'src/app/enums';
import { selectFeatureUserLoggedIn } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  language = new FormControl(Language.En, { nonNullable: true });
  loginStatus$ = this.store.select(selectFeatureUserLoggedIn);
  unsubscribe$ = new Subject();
  constructor(
    private translateService: TranslateService,
    private store: Store,
    private authService: AuthService
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

  logOut() {
    this.authService.logOut();
  }
}
