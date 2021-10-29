import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZoneInvalideHalleComponent } from './add-zone-invalide-halle.component';

describe('AddZoneInvalideHalleComponent', () => {
  let component: AddZoneInvalideHalleComponent;
  let fixture: ComponentFixture<AddZoneInvalideHalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddZoneInvalideHalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddZoneInvalideHalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
