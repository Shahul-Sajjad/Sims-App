import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceThreeWayMatchingComponent } from './invoice-three-way-matching.component';

describe('InvoiceThreeWayMatchingComponent', () => {
  let component: InvoiceThreeWayMatchingComponent;
  let fixture: ComponentFixture<InvoiceThreeWayMatchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceThreeWayMatchingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceThreeWayMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
