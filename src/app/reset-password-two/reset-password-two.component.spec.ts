import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordTwoComponent } from './reset-password-two.component';

describe('ResetPasswordTwoComponent', () => {
  let component: ResetPasswordTwoComponent;
  let fixture: ComponentFixture<ResetPasswordTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
