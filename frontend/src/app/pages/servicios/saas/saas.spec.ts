import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Saas } from './saas';

describe('Saas', () => {
  let component: Saas;
  let fixture: ComponentFixture<Saas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Saas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Saas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
