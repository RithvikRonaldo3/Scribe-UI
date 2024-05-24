import { TestBed } from '@angular/core/testing';

import { AudioScribeService } from './audio-scribe.service';

describe('AudioScribeService', () => {
  let service: AudioScribeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioScribeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
