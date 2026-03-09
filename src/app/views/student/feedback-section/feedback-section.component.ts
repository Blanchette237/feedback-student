import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackQuestionComponent } from '../feedback-question/feedback-question.component';

@Component({
  selector: 'app-feedback-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FeedbackQuestionComponent],
  templateUrl: './feedback-section.component.html',
  styleUrl: './feedback-section.component.css'
})
export class FeedbackSectionComponent {
  @Input() sectionForm!: FormGroup;
  @Input() index!: number;

  constructor(private fb: FormBuilder) {}

  get questions(): FormArray {
    return this.sectionForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.fb.group({ title: [''] }));
  }

  removeQuestion(i: number): void {
    this.questions.removeAt(i);
  }
}
