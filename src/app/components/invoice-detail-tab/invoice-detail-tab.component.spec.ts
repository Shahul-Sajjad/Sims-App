import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailTabComponent } from './invoice-detail-tab.component';

describe('InvoiceDetailTabComponent', () => {
  let component: InvoiceDetailTabComponent;
  let fixture: ComponentFixture<InvoiceDetailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDetailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
