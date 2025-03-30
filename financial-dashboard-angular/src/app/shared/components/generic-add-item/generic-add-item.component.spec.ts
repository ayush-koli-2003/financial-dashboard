import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAddItemComponent } from './generic-add-item.component';

describe('GenericAddItemComponent', () => {
  let component: GenericAddItemComponent;
  let fixture: ComponentFixture<GenericAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericAddItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
