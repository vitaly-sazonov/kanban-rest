import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, of, throwError } from 'rxjs';
import { TranslateToastrService } from '../core/services/translate-toastr.service';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private translateToastr: TranslateToastrService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.log(error.error);
      this.translateToastr.translateError(error);
      this.authService.logOut();
    } else {
      this.translateToastr.translateError(error);
    }
    return EMPTY;
  }
}
