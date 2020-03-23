import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBankDetailTabComponent } from './invoice-bank-detail-tab.component';

describe('InvoiceBankDetailTabComponent', () => {
  let component: InvoiceBankDetailTabComponent;
  let fixture: ComponentFixture<InvoiceBankDetailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceBankDetailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBankDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
