import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-question',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feedback-question.component.html',
  styleUrl: './feedback-question.component.css'
})
export class FeedbackQuestionComponent {
  @Input() questionForm!: FormGroup;
  @Input() index!: number;
}
