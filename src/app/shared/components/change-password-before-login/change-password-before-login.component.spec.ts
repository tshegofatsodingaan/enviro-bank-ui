import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordBeforeLoginComponent } from './change-password-before-login.component';

describe('ChangePasswordBeforeLoginComponent', () => {
  let component: ChangePasswordBeforeLoginComponent;
  let fixture: ComponentFixture<ChangePasswordBeforeLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordBeforeLoginComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordBeforeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
