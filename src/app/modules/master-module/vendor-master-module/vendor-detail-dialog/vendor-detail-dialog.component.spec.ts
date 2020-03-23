import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailDialogComponent } from './vendor-detail-dialog.component';

describe('VendorDetailDialogComponent', () => {
  let component: VendorDetailDialogComponent;
  let fixture: ComponentFixture<VendorDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
