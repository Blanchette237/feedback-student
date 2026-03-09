import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomepageComponent } from './views/homepage/homepage.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { RegisterComponent } from './views/authentication/register/register.component';
import { FeedbackListComponent } from './views/student/feedback-list/feedback-list.component';
import { FeedbackFormComponent } from './views/student/feedback-form/feedback-form.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feedbacks', component: FeedbackListComponent, canActivate: [authGuard] },
  { path: 'feedbacks/new', component: FeedbackFormComponent, canActivate: [authGuard] },
  { path: 'feedbacks/:id', component: FeedbackFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
