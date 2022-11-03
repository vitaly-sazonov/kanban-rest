import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_URL } from '../constants';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return request.url.split('/').includes('i18n')
      ? next.handle(request)
      : next.handle(request.clone({ url: APP_URL + request.url }));
  }
}
