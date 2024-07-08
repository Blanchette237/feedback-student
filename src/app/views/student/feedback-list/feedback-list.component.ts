import { Component } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Feedback } from '../../../models/feedback';
import {DatePipe} from "@angular/common";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [ RouterLink, MatButtonModule, MatTableModule, MatIconModule, DatePipe, HttpClientModule],
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeedbackListComponent {
  title = 'Feedback List';
  loading = true;
 /* feedbacks: Feedback[] = [ {

      description: 'Feedback for the first quarter',
      sections: [
       // {
       //   title: 'Section 1',
        //  questions: [
         //   {
           //   text: 'How was the course?',
             // responses: [
               // { date: '2024-01-01', title: 'Very good' },
                //{ date: '2024-01-02', title: 'Good' }
             // ]
          //  }
         // ]
        //}
     // ]
   // }
    ]
  displayedColumns = ['id', 'description', 'createdDAte', 'updatedDAte', 'actions'];
  feedback: any = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loading = true;
    this.http.get<Feedback[]>('api/feedbacks').subscribe((data: Feedback[]) => {
      this.feedbacks = data;
      this.loading = false;
      this.feedback = {};
    });
  }

  delete(feeback: Feedback): void {
    if (confirm(`Are you sure you want to delete ${feeback.description}?`)) {
      this.http.delete(`api/feeback/${feeback.id}`).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error: () => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      });
    }
  }

  protected readonly event = event;
 */
}
