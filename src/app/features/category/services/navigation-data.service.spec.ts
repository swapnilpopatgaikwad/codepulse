import { TestBed } from '@angular/core/testing';

import { NavigationDataService } from './navigation-data.service';

describe('NavigationDataService', () => {
  let service: NavigationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
