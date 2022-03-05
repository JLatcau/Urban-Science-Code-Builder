import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputPageComponent } from './output-page.component';

describe('OutputPageComponent', () => {
  let component: OutputPageComponent;
  let fixture: ComponentFixture<OutputPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
