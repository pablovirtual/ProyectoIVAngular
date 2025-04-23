import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus: Observable<boolean>;

  constructor(private http: HttpClient) {
    // Intentar recuperar el usuario del localStorage al iniciar
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
    this.authStatus = this.authStatusSubject.asObservable();
    this.updateAuthStatus();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string, rememberMe: boolean = false): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password, remember_me: rememberMe })
      .pipe(
        map(response => {
          // Guardar detalles de usuario y token JWT en localStorage para mantener la sesión
          const user: User = response.user;
          user.token = response.access_token;
          
          // Si remember_me es true, guardar en localStorage, sino usar sessionStorage
          if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
          }
          
          this.currentUserSubject.next(user);
          this.updateAuthStatus();
          return user;
        }),
        catchError(this.handleError<User>('login'))
      );
  }

  logout(): void {
    // Llamar al endpoint de logout de la API si es necesario
    this.http.post<any>(`${this.apiUrl}/logout`, {}).subscribe(
      () => {
        // Eliminar usuario del almacenamiento al cerrar sesión
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.updateAuthStatus();
      },
      error => {
        console.error('Error al cerrar sesión:', error);
        // Eliminar datos de usuario de todas formas
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.updateAuthStatus();
      }
    );
  }

  isAuthenticated(): boolean {
    const user = this.currentUserValue;
    return !!user?.token;
  }

  private updateAuthStatus(): void {
    this.authStatusSubject.next(this.isAuthenticated());
  }

  private getUserFromStorage(): User | null {
    // Verificar primero en localStorage, luego en sessionStorage
    const localUser = localStorage.getItem('currentUser');
    const sessionUser = sessionStorage.getItem('currentUser');
    
    if (localUser) {
      return JSON.parse(localUser);
    } else if (sessionUser) {
      return JSON.parse(sessionUser);
    }
    
    return null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error('Auth Error:', error);
      
      return of(result as T);
    };
  }
}