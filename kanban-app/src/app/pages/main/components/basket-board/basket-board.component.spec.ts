import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketBoardComponent } from './basket-board.component';

describe('BasketBoardComponent', () => {
  let component: BasketBoardComponent;
  let fixture: ComponentFixture<BasketBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
