import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterUpdateDetailsDailogComponent } from './user-master-update-details-dailog.component';

describe('UserMasterUpdateDetailsDailogComponent', () => {
  let component: UserMasterUpdateDetailsDailogComponent;
  let fixture: ComponentFixture<UserMasterUpdateDetailsDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMasterUpdateDetailsDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMasterUpdateDetailsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
