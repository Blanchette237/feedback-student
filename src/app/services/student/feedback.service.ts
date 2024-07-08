import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Feedback} from "../../models/feedback";


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = '/feedbacks';

  constructor(private http: HttpClient) {}

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedbacks`);
  }

  getFeedback(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/feedbacks/${id}`);
  }

  addFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/feedbacks`, feedback);
  }

  // Add other methods as needed
}

