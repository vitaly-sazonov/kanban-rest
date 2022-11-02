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
    if (request.url.split('/').includes('i18n')) {
      //uncomment this for deploy
      // return next.handle(
      //   request.clone({
      //     url: request.url
      //       .split('/')
      //       .map(x => (x === 'assets' ? 'project-management-app/assets' : x))
      //       .join('/'),
      //   })
      // );

      return next.handle(request);
    }
    return next.handle(request.clone({ url: APP_URL + request.url }));
  }
}
