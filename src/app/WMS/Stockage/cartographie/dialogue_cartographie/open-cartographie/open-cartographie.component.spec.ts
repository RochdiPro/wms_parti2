import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCartographieComponent } from './open-cartographie.component';

describe('OpenCartographieComponent', () => {
  let component: OpenCartographieComponent;
  let fixture: ComponentFixture<OpenCartographieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCartographieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCartographieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
