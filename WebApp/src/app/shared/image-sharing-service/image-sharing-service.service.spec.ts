import { TestBed } from '@angular/core/testing';

import { ImageSharingServiceService } from './image-sharing-service.service';

describe('ImageSharingServiceService', () => {
  let service: ImageSharingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSharingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
