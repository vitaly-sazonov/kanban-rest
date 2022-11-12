import { TestBed } from '@angular/core/testing';

import { HashService } from './hash.service';

describe('HashService', () => {
  let service: HashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
