import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestionComponent } from './feedback-question.component';

describe('FeedbackQuestionComponent', () => {
  let component: FeedbackQuestionComponent;
  let fixture: ComponentFixture<FeedbackQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
