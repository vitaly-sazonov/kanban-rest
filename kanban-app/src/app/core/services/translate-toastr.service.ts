import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslateToastrService {
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  translateError(error: HttpErrorResponse) {
    this.translate
      .get(`Error.${error.error.message}`)
      .pipe(take(1))
      .subscribe(x => {
        this.toastr.error(x);
      });
  }
}
