import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoLineDetailsDialogComponent } from './po-line-details-dialog.component';

describe('PoLineDetailsDialogComponent', () => {
  let component: PoLineDetailsDialogComponent;
  let fixture: ComponentFixture<PoLineDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoLineDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoLineDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
