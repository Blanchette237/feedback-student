import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback } from '../../../models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isLoading = true;
    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load feedbacks.';
        this.isLoading = false;
      }
    });
  }

  delete(feedback: Feedback): void {
    if (!feedback.feedId) return;
    if (!confirm(`Delete this feedback?\n"${feedback.description}"`)) return;

    this.feedbackService.deleteFeedback(feedback.feedId).subscribe({
      next: () => {
        this.successMessage = 'Feedback deleted successfully.';
        this.loadFeedbacks();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to delete feedback.';
      }
    });
  }

  edit(feedback: Feedback): void {
    this.router.navigate(['/feedbacks', feedback.feedId]);
  }
}
