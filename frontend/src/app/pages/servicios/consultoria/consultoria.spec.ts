import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consultoria } from './consultoria';

describe('Consultoria', () => {
  let component: Consultoria;
  let fixture: ComponentFixture<Consultoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consultoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consultoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
