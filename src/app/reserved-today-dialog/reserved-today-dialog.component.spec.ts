import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedTodayDialogComponent } from './reserved-today-dialog.component';

describe('ReservedTodayDialogComponent', () => {
  let component: ReservedTodayDialogComponent;
  let fixture: ComponentFixture<ReservedTodayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservedTodayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedTodayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
