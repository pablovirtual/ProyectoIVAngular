import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Error 401 Unauthorized - Sesión expirada o token inválido
          console.error('Sesión expirada o token inválido');
          
          // Cerrar sesión y redirigir al login
          this.authService.logout();
          this.router.navigate(['/login'], { 
            queryParams: { returnUrl: this.router.url, reason: 'session_expired' }
          });
        } else if (error.status === 403) {
          // Error 403 Forbidden - No tiene permisos para el recurso
          console.error('No tiene permisos para acceder a este recurso');
          this.router.navigate(['/home'], { 
            queryParams: { error: 'forbidden' }
          });
        } else if (error.status === 404) {
          // Error 404 Not Found - Recurso no encontrado
          console.error('Recurso no encontrado');
        } else if (error.status === 429) {
          // Error 429 Too Many Requests - Límite de solicitudes alcanzado
          console.error('Demasiadas solicitudes. Por favor, espere unos minutos e intente de nuevo.');
        } else if (error.status === 0) {
          // Error de conexión - Servidor no disponible
          console.error('No se puede conectar al servidor. Verifique su conexión a Internet.');
        } else if (error.status >= 500) {
          // Errores del servidor 5xx
          console.error('Error del servidor. Por favor, intente más tarde.');
        }

        // Personalizar mensaje de error para la UI
        let errorMessage = 'Ha ocurrido un error desconocido';
        
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = error.error?.message || error.statusText || errorMessage;
        }

        // Propagar el error para que los componentes puedan manejarlo
        return throwError(() => ({
          error: error.error,
          status: error.status,
          message: errorMessage
        }));
      })
    );
  }
}