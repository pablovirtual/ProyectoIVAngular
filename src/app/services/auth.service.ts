import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
    this.authStatus = this.authStatusSubject.asObservable();
    this.updateAuthStatus();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string, rememberMe: boolean = false): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          const user: User = response.user;
          user.token = response.token;
          
          // Store user details and token in local storage to keep user logged in
          if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }
          
          this.currentUserSubject.next(user);
          this.updateAuthStatus();
          return user;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  logout(): void {
    // Remove user from storage
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.updateAuthStatus();

    // Call API to invalidate token (if needed)
    this.http.post<any>(`${this.apiUrl}/logout`, {}).subscribe();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue?.token;
  }

  private updateAuthStatus(): void {
    this.authStatusSubject.next(this.isAuthenticated());
  }

  private getUserFromStorage(): User | null {
    // Try to get user from local storage first, then from session storage
    const user = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
