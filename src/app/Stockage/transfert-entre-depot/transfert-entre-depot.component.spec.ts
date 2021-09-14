import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertEntreDepotComponent } from './transfert-entre-depot.component';

describe('TransfertEntreDepotComponent', () => {
  let component: TransfertEntreDepotComponent;
  let fixture: ComponentFixture<TransfertEntreDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertEntreDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertEntreDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
