import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Faq } from '../models/faq.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Get home page content from the API
   */
  getHomeContent(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/home`).pipe(
      map(response => response.data || response),
      catchError(this.handleError<any>('getHomeContent', {}))
    );
  }

  /**
   * Get list of FAQs from the API
   */
  getFaqs(): Observable<Faq[]> {
    return this.http.get<any>(`${this.apiUrl}/faqs`).pipe(
      map(response => response.data || response),
      catchError(this.handleError<Faq[]>('getFaqs', []))
    );
  }

  /**
   * Get Quienes Somos content from the API
   */
  getQuienesSomosContent(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quienes-somos`).pipe(
      map(response => response.data || response),
      catchError(this.handleError<any>('getQuienesSomosContent', {}))
    );
  }

  /**
   * Handle Http operation that failed.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}