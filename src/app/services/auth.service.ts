import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
    }
  }

  login(email: string, password: string): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUser.set(response.user);
      })
    );
  }

  register(name: string, email: string, password: string, password_confirmation: string): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/register`, {
      name, email, password, password_confirmation
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUser.set(response.user);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.authHeaders() }).pipe(
      tap(() => this.clearSession())
    );
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`, { headers: this.authHeaders() });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
  }

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
