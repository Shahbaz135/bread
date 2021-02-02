import { TestBed } from '@angular/core/testing';

import { WrapHttpService } from './wrap-http.service';

describe('WrapHttpService', () => {
  let service: WrapHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WrapHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
