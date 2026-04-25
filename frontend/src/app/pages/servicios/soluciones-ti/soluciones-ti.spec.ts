import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolucionesTi } from './soluciones-ti';

describe('SolucionesTi', () => {
  let component: SolucionesTi;
  let fixture: ComponentFixture<SolucionesTi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolucionesTi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolucionesTi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
