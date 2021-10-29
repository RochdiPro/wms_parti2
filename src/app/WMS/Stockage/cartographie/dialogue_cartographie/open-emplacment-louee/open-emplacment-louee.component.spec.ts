import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEmplacmentLoueeComponent } from './open-emplacment-louee.component';

describe('OpenEmplacmentLoueeComponent', () => {
  let component: OpenEmplacmentLoueeComponent;
  let fixture: ComponentFixture<OpenEmplacmentLoueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenEmplacmentLoueeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenEmplacmentLoueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
