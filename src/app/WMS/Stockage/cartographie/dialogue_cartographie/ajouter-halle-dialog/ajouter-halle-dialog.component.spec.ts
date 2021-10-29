import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterHalleDialogComponent } from './ajouter-halle-dialog.component';

describe('AjouterHalleDialogComponent', () => {
  let component: AjouterHalleDialogComponent;
  let fixture: ComponentFixture<AjouterHalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterHalleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterHalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
