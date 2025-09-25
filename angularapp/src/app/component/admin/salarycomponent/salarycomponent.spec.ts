import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salarycomponent } from './salary.component';

describe('Salarycomponent', () => {
  let component: Salarycomponent;
  let fixture: ComponentFixture<Salarycomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Salarycomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Salarycomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
