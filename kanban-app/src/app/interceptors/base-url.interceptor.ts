import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { APP_URL } from '../constants';
import { NotificationService } from '../core/services/notification.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private notification: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return request.url.split('/').includes('i18n')
      ? next.handle(request)
      : next.handle(request.clone({ url: APP_URL + request.url })).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(() => {
              new Error(`${error.message}`);
              this.notification
                .setNotification(`Backend returned error with name: ${
                error.name
              }, and message: 
            ${JSON.stringify(error.message)}`);
            });
          })
        );
  }
}
