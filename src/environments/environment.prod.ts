export const environment = {
  production: true,
  apiUrl: 'https://api-laravel.midominio.com/api', // Cambiar a la URL de producción real
  apiTimeout: 15000, // Timeout más largo para peticiones API en entorno de producción
  apiRetryAttempts: 3, // Más intentos de reconexión en producción
  authTokenName: 'auth_token', // Nombre del token JWT en localStorage/sessionStorage
  defaultLanguage: 'es',
  cacheDuration: 300000 // Duración de caché en milisegundos (5 minutos en producción)
};
