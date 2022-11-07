import { TestBed } from '@angular/core/testing';

import { ErrorDefinitionService } from './error-definition.service';

describe('ErrorDefinitionService', () => {
  let service: ErrorDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
