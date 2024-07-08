import {Component, OnInit} from '@angular/core';
import {StudentFeedbackService} from "../../../services/student/student-feedback-servive.service";
import {Router} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-student-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-feedback.component.html',
  styleUrl: './student-feedback.component.css'
})
export class StudentFeedbackComponent implements OnInit{
  email:string = ''
  password:string = ''
  isSubmitting:boolean = false
  validationErrors:Array<any> = []

  constructor(public stdFeedback: StudentFeedbackService, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
      this.router.navigateByUrl('/dashboard')
    }
  }

  loginAction() {
    this.isSubmitting = true;
    let payload = {
      email:this.email,
      password: this.password,
    }
    this.stdFeedback.enregistrerFeedback(payload)
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        this.router.navigateByUrl('/dashboard')
        return data
      }).catch(error => {
      this.isSubmitting = false;
      if (error.response.data.errors != undefined) {
        this.validationErrors = error.response.data.message
      }
      if (error.response.data.error != undefined) {
        this.validationErrors = error.response.data.error
      }
      return error
    })
  }
}
