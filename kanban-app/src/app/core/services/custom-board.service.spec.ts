import { TestBed } from '@angular/core/testing';

import { CustomBoardService } from './custom-board.service';

describe('CustomBoardService', () => {
  let service: CustomBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
