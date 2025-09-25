import { TestBed } from '@angular/core/testing';

import { Useraccount } from './useraccount';

describe('Useraccount', () => {
  let service: Useraccount;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Useraccount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
