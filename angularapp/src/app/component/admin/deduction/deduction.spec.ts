import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deduction } from './deduction.component';

describe('Deduction', () => {
  let component: Deduction;
  let fixture: ComponentFixture<Deduction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deduction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deduction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
