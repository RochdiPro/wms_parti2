import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEtageDialogComponent } from './ajouter-etage-dialog.component';

describe('AjouterEtageDialogComponent', () => {
  let component: AjouterEtageDialogComponent;
  let fixture: ComponentFixture<AjouterEtageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEtageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterEtageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
