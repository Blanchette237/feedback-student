import { Routes } from '@angular/router';
import {HomepageComponent} from "./views/homepage/homepage.component";
import {LoginComponent} from "./views/authentication/login/login.component";
import {StudentFeedbackComponent} from "./views/student/student-feedback/student-feedback.component";

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'student/feedback', component: StudentFeedbackComponent },


];
