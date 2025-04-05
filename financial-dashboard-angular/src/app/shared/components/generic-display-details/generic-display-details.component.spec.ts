import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDisplayDetailsComponent } from './generic-display-details.component';

describe('GenericDisplayDetailsComponent', () => {
  let component: GenericDisplayDetailsComponent;
  let fixture: ComponentFixture<GenericDisplayDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericDisplayDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericDisplayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
