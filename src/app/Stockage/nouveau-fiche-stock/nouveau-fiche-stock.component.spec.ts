import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauFicheStockComponent } from './nouveau-fiche-stock.component';

describe('NouveauFicheStockComponent', () => {
  let component: NouveauFicheStockComponent;
  let fixture: ComponentFixture<NouveauFicheStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauFicheStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauFicheStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
