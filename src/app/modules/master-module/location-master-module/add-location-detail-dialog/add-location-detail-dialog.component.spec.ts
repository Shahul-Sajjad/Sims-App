import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationDetailDialogComponent } from './add-location-detail-dialog.component';

describe('AddLocationDetailDialogComponent', () => {
  let component: AddLocationDetailDialogComponent;
  let fixture: ComponentFixture<AddLocationDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLocationDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
