import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenZoneInvalideComponent } from './open-zone-invalide.component';

describe('OpenZoneInvalideComponent', () => {
  let component: OpenZoneInvalideComponent;
  let fixture: ComponentFixture<OpenZoneInvalideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenZoneInvalideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenZoneInvalideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
