import { TestBed } from '@angular/core/testing';

import { Salarycomponent } from './salarycomponent';

describe('Salarycomponent', () => {
  let service: Salarycomponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Salarycomponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
