import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenClientReserveComponent } from './open-client-reserve.component';

describe('OpenClientReserveComponent', () => {
  let component: OpenClientReserveComponent;
  let fixture: ComponentFixture<OpenClientReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenClientReserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenClientReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
