import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterDetailsDailogComponent } from './user-master-details-dailog.component';

describe('UserMasterDetailsDailogComponent', () => {
  let component: UserMasterDetailsDailogComponent;
  let fixture: ComponentFixture<UserMasterDetailsDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMasterDetailsDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMasterDetailsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
