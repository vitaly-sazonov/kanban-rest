import { TestBed } from '@angular/core/testing';

import { TranslateToastrService } from './translate-toastr.service';

describe('TranslateToastrService', () => {
  let service: TranslateToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
