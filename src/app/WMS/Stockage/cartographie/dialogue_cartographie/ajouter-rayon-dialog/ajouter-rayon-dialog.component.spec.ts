import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRayonDialogComponent } from './ajouter-rayon-dialog.component';

describe('AjouterRayonDialogComponent', () => {
  let component: AjouterRayonDialogComponent;
  let fixture: ComponentFixture<AjouterRayonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterRayonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterRayonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
