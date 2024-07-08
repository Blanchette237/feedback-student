
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../../services/student/feedback.service';
import {Feedback} from "../../../models/feedback";

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      sections: this.fb.array([]) // Initialize with empty array
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  onSubmit(): void {
    const feedback: Feedback = this.feedbackForm.value;
    this.feedbackService.addFeedback(feedback).subscribe(result => {
      console.log('Feedback submitted successfully', result);
    });
  }
}
