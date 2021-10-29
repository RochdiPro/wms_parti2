import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtageDialogComponent } from './edit-etage-dialog.component';

describe('EditEtageDialogComponent', () => {
  let component: EditEtageDialogComponent;
  let fixture: ComponentFixture<EditEtageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEtageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEtageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
