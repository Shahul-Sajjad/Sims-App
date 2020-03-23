import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCommentTabComponent } from './invoice-comment-tab.component';

describe('InvoiceCommentTabComponent', () => {
  let component: InvoiceCommentTabComponent;
  let fixture: ComponentFixture<InvoiceCommentTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCommentTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCommentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
