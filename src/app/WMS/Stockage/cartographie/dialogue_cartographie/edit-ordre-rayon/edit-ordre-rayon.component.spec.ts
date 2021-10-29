import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrdreRayonComponent } from './edit-ordre-rayon.component';

describe('EditOrdreRayonComponent', () => {
  let component: EditOrdreRayonComponent;
  let fixture: ComponentFixture<EditOrdreRayonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrdreRayonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrdreRayonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
