import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MawChartComponent } from './maw-chart.component';

describe('MawChartComponent', () => {
  let component: MawChartComponent;
  let fixture: ComponentFixture<MawChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MawChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MawChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
