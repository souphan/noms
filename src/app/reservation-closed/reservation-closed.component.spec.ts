import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationClosedComponent } from './reservation-closed.component';

describe('ReservationClosedComponent', () => {
  let component: ReservationClosedComponent;
  let fixture: ComponentFixture<ReservationClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
