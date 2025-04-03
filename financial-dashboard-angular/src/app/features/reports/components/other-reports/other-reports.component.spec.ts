import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherReportsComponent } from './other-reports.component';

describe('OtherReportsComponent', () => {
  let component: OtherReportsComponent;
  let fixture: ComponentFixture<OtherReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
