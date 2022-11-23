import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoardDialogComponent } from './select-board-dialog.component';

describe('SelectBoardDialogComponent', () => {
  let component: SelectBoardDialogComponent;
  let fixture: ComponentFixture<SelectBoardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBoardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
