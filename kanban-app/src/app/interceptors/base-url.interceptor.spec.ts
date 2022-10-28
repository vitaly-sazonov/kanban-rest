import { TestBed } from '@angular/core/testing';

import { BaseUrlInterceptor } from './base-url.interceptor';

describe('BaseUrlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseUrlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BaseUrlInterceptor = TestBed.inject(BaseUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
