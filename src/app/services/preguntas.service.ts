import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Faq } from '../models/faq.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private apiUrl = `${environment.apiUrl}/preguntas`;

  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<Faq[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Adaptamos la respuesta del backend a nuestro modelo Faq
        const data = response.data || response;
        return data.map((item: any) => ({
          id: item.id,
          question: item.pregunta || item.titulo, // Adaptamos en caso de diferentes nombres de campo
          answer: item.respuesta || item.contenido,
          order: item.orden || item.posicion || 0,
          collapsed: true, // Añadimos la propiedad para UI
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
      }),
      catchError(this.handleError<Faq[]>('getPreguntas', []))
    );
  }

  getPregunta(id: number): Observable<Faq> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        const item = response.data || response;
        return {
          id: item.id,
          question: item.pregunta || item.titulo,
          answer: item.respuesta || item.contenido,
          order: item.orden || item.posicion || 0,
          collapsed: true,
          created_at: item.created_at,
          updated_at: item.updated_at
        };
      }),
      catchError(this.handleError<Faq>('getPregunta'))
    );
  }

  createPregunta(pregunta: any): Observable<Faq> {
    return this.http.post<any>(this.apiUrl, pregunta).pipe(
      map(response => {
        const item = response.data || response;
        return {
          id: item.id,
          question: item.pregunta || item.titulo,
          answer: item.respuesta || item.contenido,
          order: item.orden || item.posicion || 0,
          collapsed: true,
          created_at: item.created_at,
          updated_at: item.updated_at
        };
      }),
      catchError(this.handleError<Faq>('createPregunta'))
    );
  }

  updatePregunta(id: number, pregunta: any): Observable<Faq> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pregunta).pipe(
      map(response => {
        const item = response.data || response;
        return {
          id: item.id,
          question: item.pregunta || item.titulo,
          answer: item.respuesta || item.contenido,
          order: item.orden || item.posicion || 0,
          collapsed: true,
          created_at: item.created_at,
          updated_at: item.updated_at
        };
      }),
      catchError(this.handleError<Faq>('updatePregunta'))
    );
  }

  deletePregunta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<any>('deletePregunta'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error('API Error:', error);
      
      // Deja que la aplicación siga funcionando retornando un resultado vacío
      return of(result as T);
    };
  }
}