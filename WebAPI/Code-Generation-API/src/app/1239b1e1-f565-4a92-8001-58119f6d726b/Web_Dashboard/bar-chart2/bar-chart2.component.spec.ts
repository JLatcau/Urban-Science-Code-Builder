import { classify } from '@angular-devkit/core/src/utils/strings';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChart2Component } from './bar-chart2.component';

describe('BarChart2Component', () => {
  let component: BarChart2Component;
  let fixture: ComponentFixture<BarChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
