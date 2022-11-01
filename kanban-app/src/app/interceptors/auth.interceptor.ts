import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalstorageService } from '../core/services/localstorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localstorageService: LocalstorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.localstorageService.getToken();

    return authToken
      ? next.handle(
          request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${authToken}`
            ),
          })
        )
      : next.handle(request);
  }
}
