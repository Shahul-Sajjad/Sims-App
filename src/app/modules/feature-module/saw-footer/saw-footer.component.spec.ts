import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SawFooterComponent } from './saw-footer.component';

describe('SawFooterComponent', () => {
  let component: SawFooterComponent;
  let fixture: ComponentFixture<SawFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SawFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SawFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
