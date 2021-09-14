import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStockageComponent } from './menu-stockage.component';

describe('MenuStockageComponent', () => {
  let component: MenuStockageComponent;
  let fixture: ComponentFixture<MenuStockageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuStockageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
