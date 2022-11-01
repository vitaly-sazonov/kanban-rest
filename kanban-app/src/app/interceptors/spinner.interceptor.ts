import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setLoadingFalse, setLoadingTrue } from '../redux/actions/user.actions';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.store.dispatch(setLoadingTrue());
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) this.store.dispatch(setLoadingFalse());
      })
    );
  }
}
