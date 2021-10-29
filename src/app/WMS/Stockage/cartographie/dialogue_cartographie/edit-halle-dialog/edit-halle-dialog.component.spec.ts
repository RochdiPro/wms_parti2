import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHalleDialogComponent } from './edit-halle-dialog.component';

describe('EditHalleDialogComponent', () => {
  let component: EditHalleDialogComponent;
  let fixture: ComponentFixture<EditHalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHalleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
