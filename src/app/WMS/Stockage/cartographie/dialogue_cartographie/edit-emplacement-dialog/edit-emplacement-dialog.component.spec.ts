import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmplacementDialogComponent } from './edit-emplacement-dialog.component';

describe('EditEmplacementDialogComponent', () => {
  let component: EditEmplacementDialogComponent;
  let fixture: ComponentFixture<EditEmplacementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmplacementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmplacementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
