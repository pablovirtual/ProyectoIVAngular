import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Faq } from '../models/faq.model';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  private apiUrl = `${environment.apiUrl}/faqs`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las preguntas frecuentes
   */
  getFaqs(): Observable<Faq[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data || response),
      catchError(this.handleError<Faq[]>('getFaqs', []))
    );
  }

  /**
   * Obtiene una pregunta frecuente por su ID
   */
  getFaq(id: number): Observable<Faq> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data || response),
      catchError(this.handleError<Faq>('getFaq'))
    );
  }

  /**
   * Crea una nueva pregunta frecuente
   */
  createFaq(faq: Faq): Observable<Faq> {
    return this.http.post<any>(this.apiUrl, faq).pipe(
      map(response => response.data || response),
      catchError(this.handleError<Faq>('createFaq'))
    );
  }

  /**
   * Actualiza una pregunta frecuente existente
   */
  updateFaq(id: number, faq: Faq): Observable<Faq> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, faq).pipe(
      map(response => response.data || response),
      catchError(this.handleError<Faq>('updateFaq'))
    );
  }

  /**
   * Elimina una pregunta frecuente
   */
  deleteFaq(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<any>('deleteFaq'))
    );
  }

  /**
   * Maneja los errores de las operaciones HTTP
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error('API Error:', error);
      
      // Deja que la aplicación siga funcionando retornando un resultado vacío
      return of(result as T);
    };
  }
}