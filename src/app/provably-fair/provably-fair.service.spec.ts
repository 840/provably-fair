import { TestBed } from '@angular/core/testing';

import { ProvablyFairService } from './provably-fair.service';

describe('ProvablyFairService', () => {
  let service: ProvablyFairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvablyFairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
