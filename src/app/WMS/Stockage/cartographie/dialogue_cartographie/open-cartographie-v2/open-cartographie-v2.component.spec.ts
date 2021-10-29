import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCartographieV2Component } from './open-cartographie-v2.component';

describe('OpenCartographieV2Component', () => {
  let component: OpenCartographieV2Component;
  let fixture: ComponentFixture<OpenCartographieV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCartographieV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCartographieV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
