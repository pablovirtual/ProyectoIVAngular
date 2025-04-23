import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

/** Orden de los interceptores:
 * 1. LoadingInterceptor: Muestra un indicador de carga para las solicitudes HTTP
 * 2. AuthInterceptor: Añade el token de autenticación a las solicitudes
 * 3. ErrorInterceptor: Maneja los errores HTTP de la aplicación
 */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];