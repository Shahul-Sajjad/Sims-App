import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SawDatatableComponent } from './saw-datatable.component';

describe('SawDatatableComponent', () => {
  let component: SawDatatableComponent;
  let fixture: ComponentFixture<SawDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SawDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SawDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
