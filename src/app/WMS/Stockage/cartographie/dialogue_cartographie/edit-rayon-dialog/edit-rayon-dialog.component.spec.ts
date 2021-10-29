import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRayonDialogComponent } from './edit-rayon-dialog.component';

describe('EditRayonDialogComponent', () => {
  let component: EditRayonDialogComponent;
  let fixture: ComponentFixture<EditRayonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRayonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRayonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
