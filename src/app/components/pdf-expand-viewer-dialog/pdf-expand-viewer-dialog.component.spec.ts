import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfExpandViewerDialogComponent } from './pdf-expand-viewer-dialog.component';

describe('PdfExpandViewerDialogComponent', () => {
  let component: PdfExpandViewerDialogComponent;
  let fixture: ComponentFixture<PdfExpandViewerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfExpandViewerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfExpandViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
