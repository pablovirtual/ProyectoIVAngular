import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Solo interceptamos las solicitudes a nuestra API
    if (req.url.includes(environment.apiUrl)) {
      const currentUser = this.authService.currentUserValue;
      
      // Si hay un usuario autenticado con token, añadimos el encabezado Authorization
      if (currentUser && currentUser.token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
      }
    }
    
    // Pasamos la solicitud al siguiente manejador en la cadena
    return next.handle(req);
  }
}