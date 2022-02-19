import { TestBed } from '@angular/core/testing';

import { HttpUrlService } from './http-url.service';

describe('HttpUrlService', () => {
  let service: HttpUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
