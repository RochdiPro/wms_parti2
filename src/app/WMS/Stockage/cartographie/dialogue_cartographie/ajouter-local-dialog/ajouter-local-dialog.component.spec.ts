import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLocalDialogComponent } from './ajouter-local-dialog.component';

describe('AjouterLocalDialogComponent', () => {
  let component: AjouterLocalDialogComponent;
  let fixture: ComponentFixture<AjouterLocalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterLocalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterLocalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
