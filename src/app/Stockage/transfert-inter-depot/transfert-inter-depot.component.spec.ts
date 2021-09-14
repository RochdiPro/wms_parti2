import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertInterDepotComponent } from './transfert-inter-depot.component';

describe('TransfertInterDepotComponent', () => {
  let component: TransfertInterDepotComponent;
  let fixture: ComponentFixture<TransfertInterDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertInterDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertInterDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
