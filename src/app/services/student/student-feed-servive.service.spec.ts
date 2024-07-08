import { TestBed } from '@angular/core/testing';

import { StudentFeedbackService } from './student-feedback-servive.service';

describe('StudentFeedServiveService', () => {
  let service: StudentFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
