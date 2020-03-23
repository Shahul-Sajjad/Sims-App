import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDetailTabComponent } from './upload-detail-tab.component';

describe('UploadDetailTabComponent', () => {
  let component: UploadDetailTabComponent;
  let fixture: ComponentFixture<UploadDetailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDetailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
