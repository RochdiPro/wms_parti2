import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilleLogistiqueComponent } from './famille-logistique.component';

describe('FamilleLogistiqueComponent', () => {
  let component: FamilleLogistiqueComponent;
  let fixture: ComponentFixture<FamilleLogistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilleLogistiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilleLogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
