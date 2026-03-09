import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackSectionComponent } from '../feedback-section/feedback-section.component';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FeedbackSectionComponent],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent implements OnInit {
  form: FormGroup;
  isSubmitting = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  feedbackId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      sections: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.feedbackId = +id;
      this.loadFeedback(this.feedbackId);
    } else {
      this.addSection();
    }
  }

  get sections(): FormArray {
    return this.form.get('sections') as FormArray;
  }

  addSection(): void {
    this.sections.push(this.fb.group({
      title: ['', Validators.required],
      description: [''],
      questions: this.fb.array([this.fb.group({ title: [''] })])
    }));
  }

  removeSection(i: number): void {
    this.sections.removeAt(i);
  }

  loadFeedback(id: number): void {
    this.isLoading = true;
    this.feedbackService.getFeedback(id).subscribe({
      next: (feedback) => {
        this.form.patchValue({ description: feedback.description });
        feedback.sections?.forEach(section => {
          const sectionGroup = this.fb.group({
            title: [section.title, Validators.required],
            description: [section.description || ''],
            questions: this.fb.array(
              (section.questions || []).map(q => this.fb.group({ title: [q.title] }))
            )
          });
          this.sections.push(sectionGroup);
        });
        if (this.sections.length === 0) this.addSection();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load feedback.';
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    this.errorMessage = '';

    const request$ = this.feedbackId
      ? this.feedbackService.updateFeedback(this.feedbackId, this.form.value)
      : this.feedbackService.createFeedback(this.form.value);

    request$.subscribe({
      next: () => this.router.navigateByUrl('/feedbacks'),
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to save feedback.';
      }
    });
  }
}
