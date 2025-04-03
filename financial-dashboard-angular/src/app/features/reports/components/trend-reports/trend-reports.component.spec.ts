import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendReportsComponent } from './trend-reports.component';

describe('TrendReportsComponent', () => {
  let component: TrendReportsComponent;
  let fixture: ComponentFixture<TrendReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrendReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
