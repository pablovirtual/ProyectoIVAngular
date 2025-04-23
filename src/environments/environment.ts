// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api', // URL de la API Laravel (se actualizará con la URL real)
  apiTimeout: 10000, // Timeout para peticiones API en milisegundos
  apiRetryAttempts: 2, // Intentos de reconexión a la API
  authTokenName: 'auth_token', // Nombre del token JWT en localStorage/sessionStorage
  defaultLanguage: 'es',
  cacheDuration: 60000 // Duración de caché en milisegundos (1 minuto)
};
