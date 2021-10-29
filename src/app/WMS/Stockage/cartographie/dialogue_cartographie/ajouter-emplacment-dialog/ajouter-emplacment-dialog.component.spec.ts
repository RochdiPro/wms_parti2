import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEmplacmentDialogComponent } from './ajouter-emplacment-dialog.component';

describe('AjouterEmplacmentDialogComponent', () => {
  let component: AjouterEmplacmentDialogComponent;
  let fixture: ComponentFixture<AjouterEmplacmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterEmplacmentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterEmplacmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
