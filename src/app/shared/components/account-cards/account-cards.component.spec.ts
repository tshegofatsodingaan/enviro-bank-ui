import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCardsComponent } from './account-cards.component';

describe('AccountCardsComponent', () => {
  let component: AccountCardsComponent;
  let fixture: ComponentFixture<AccountCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountCardsComponent]
    });
    fixture = TestBed.createComponent(AccountCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
