import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffect } from './redux/effects/user.effect';

import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { WelcomeModule } from './pages/welcome/welcome.module';
import { MainModule } from './pages/main/main.module';

import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationEffect } from './redux/effects/notification.effect';
import { notificationReducer } from './redux/reducers/notification.reducer';
import { confirmationReducer } from './redux/reducers/confirm.reducer';
import { ConfirmationEffect } from './redux/effects/confirm.effect';
import { modalReducer } from './redux/reducers/modal.reducer';
import { boardsReducer } from './redux/reducers/boards.reducers';
import { BoardsEffect } from './redux/effects/boards.effects';
import { userReducer } from './redux/reducers/user.reducer';

import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const Material = [MatIconModule, MatButtonModule];

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Material,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    WelcomeModule,
    MainModule,
    StoreModule.forRoot(
      {
        users: userReducer,
        modals: modalReducer,
        notifications: notificationReducer,
        confirmations: confirmationReducer,
        boards: boardsReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    BrowserAnimationsModule,
    EffectsModule.forRoot([
      UserEffect,
      NotificationEffect,
      ConfirmationEffect,
      BoardsEffect,
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
