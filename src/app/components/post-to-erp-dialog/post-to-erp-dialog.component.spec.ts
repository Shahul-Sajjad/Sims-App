import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostToErpDialogComponent } from './post-to-erp-dialog.component';

describe('PostToErpDialogComponent', () => {
  let component: PostToErpDialogComponent;
  let fixture: ComponentFixture<PostToErpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostToErpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostToErpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
