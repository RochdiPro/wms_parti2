import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueCartographieComponent } from './dialogue-cartographie.component';

describe('DialogueCartographieComponent', () => {
  let component: DialogueCartographieComponent;
  let fixture: ComponentFixture<DialogueCartographieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueCartographieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueCartographieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
