import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInfoLocalComponent } from './open-info-local.component';

describe('OpenInfoLocalComponent', () => {
  let component: OpenInfoLocalComponent;
  let fixture: ComponentFixture<OpenInfoLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenInfoLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInfoLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
