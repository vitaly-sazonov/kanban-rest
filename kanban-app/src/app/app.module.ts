import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { TranslateService } from './core/services/translate.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { WelcomeModule } from './pages/welcome/welcome.module';
import { MainModule } from './pages/main/main.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { userReducer } from './redux/reducers/user.reducer';
import { UserEffect } from './redux/effects/user.effect';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffect } from './redux/effects/notification.effect';
import { notificationReducer } from './redux/reducers/notification.reducer';
import { confirmationReducer } from './redux/reducers/confirm.reducer';
import { ConfirmationEffect } from './redux/effects/confirm.effect';
import { modalReducer } from './redux/reducers/modal.reducer';

export function setupTranslateServiceFactory(
  service: TranslateService
): Function {
  return () => service.use('en');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
      },
      {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([UserEffect, NotificationEffect, ConfirmationEffect]),
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateServiceFactory,
      deps: [TranslateService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
