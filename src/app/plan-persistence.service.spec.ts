/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanPersistenceService } from './plan-persistence.service';

describe('Service: PlanPersistence', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanPersistenceService]
    });
  });

  it('should ...', inject([PlanPersistenceService], (service: PlanPersistenceService) => {
    expect(service).toBeTruthy();
  }));
});
