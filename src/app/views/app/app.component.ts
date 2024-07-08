import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Feedback} from "../../models/feedback";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'feedback-student';
  loading = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {


  }
}
