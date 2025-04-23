# Angular Laravel App

## Descripción General

Angular Laravel App es una aplicación web moderna que utiliza Angular para el frontend y Laravel como backend REST API. La aplicación está diseñada con una interfaz de usuario intuitiva y responsiva utilizando el tema Bootswatch LUX, ofreciendo una experiencia de usuario atractiva y profesional.

## Tecnologías Utilizadas

- **Frontend**: Angular 13+
- **Backend**: Laravel (API REST)
- **Estilos**: Bootswatch LUX (basado en Bootstrap 5)
- **Servidor Web**: Express.js (solo para servir los archivos estáticos)
- **Iconos**: Font Awesome 5

## Estructura de la Aplicación

La aplicación está organizada en componentes claramente definidos:

### Componentes Principales

1. **Home**: Página principal que muestra una visión general de la aplicación.
2. **Quiénes Somos**: Información sobre la empresa, incluyendo visión, misión, políticas de calidad y ubicación física.
3. **FAQ**: Preguntas frecuentes organizadas por categorías con diseño acordeón.
4. **Login**: Formulario de autenticación con validación de campos.

### Servicios

1. **ApiService**: Gestiona las comunicaciones generales con la API REST de Laravel, incluyendo:
   - Obtención de contenido de la página principal
   - Obtención de preguntas frecuentes
   - Obtención de información de "Quiénes Somos"

2. **AuthService**: Maneja la autenticación de usuarios y el estado de la sesión:
   - Login y logout de usuarios
   - Almacenamiento seguro de tokens JWT
   - Verificación del estado de autenticación
   - Gestión de permisos

3. **FaqsService**: Servicio especializado para operaciones CRUD con preguntas frecuentes:
   - Listar todas las preguntas
   - Obtener una pregunta específica
   - Crear nuevas preguntas
   - Actualizar preguntas existentes
   - Eliminar preguntas

### Modelos de Datos

1. **User**: Estructura de datos para la información del usuario.
2. **Faq**: Estructura de datos para las preguntas frecuentes.

## Arquitectura

La aplicación sigue una arquitectura cliente-servidor:

1. **Cliente (Angular)**: 
   - Corre en el navegador del usuario
   - Gestiona la interfaz de usuario y la lógica de presentación
   - Se comunica con el servidor mediante peticiones HTTP

2. **Servidor (Laravel, no incluido en este repositorio)**:
   - API REST que proporciona endpoints para:
     - Autenticación de usuarios
     - Recuperación de datos (FAQ, información de la empresa, etc.)
     - Operaciones CRUD según los permisos del usuario

3. **Servidor Express.js (incluido)**:
   - Únicamente sirve los archivos estáticos de Angular al navegador
   - No interviene en la comunicación entre Angular y Laravel

## Configuración y Ejecución

### Requisitos

- Node.js 14+ y npm
- Express.js

### Instalación

1. Clonar el repositorio:
   ```
   git clone <url-del-repositorio>
   cd angular-laravel-app
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Ejecutar el servidor:
   ```
   node server.js
   ```

4. Abrir en el navegador:
   ```
   http://localhost:5000
   ```

### Configuración de la API

Para conectar la aplicación con el backend de Laravel, es necesario configurar los parámetros de la API en el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://tu-api-laravel.com/api',
  apiTimeout: 10000, // Timeout para peticiones API en milisegundos
  apiRetryAttempts: 2, // Intentos de reconexión a la API
  authTokenName: 'auth_token', // Nombre del token JWT en localStorage/sessionStorage
  defaultLanguage: 'es',
  cacheDuration: 60000 // Duración de caché en milisegundos
};
```

Y para el entorno de producción en `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api-laravel.midominio.com/api', // URL de producción
  apiTimeout: 15000,
  apiRetryAttempts: 3,
  authTokenName: 'auth_token',
  defaultLanguage: 'es',
  cacheDuration: 300000 // 5 minutos en producción
};
```

## Flujo de Trabajo

1. **Navegación**: El usuario puede navegar entre las diferentes secciones a través del menú de navegación superior.
2. **Autenticación**: Los usuarios pueden iniciar sesión para acceder a funcionalidades adicionales.
3. **Consumo de Datos**: La aplicación solicita datos al backend Laravel a través de los servicios definidos.
4. **Interacción**: Dependiendo del componente, el usuario puede interactuar con diferentes elementos (formularios, acordeones, etc.).

## Componentes en Detalle

### Home

Página principal que ofrece una visión general de la aplicación con tarjetas que destacan las principales características y enlaces directos a los componentes más importantes.

### Quiénes Somos

Presenta información corporativa estructurada en secciones:
- **Visión**: Objetivos a largo plazo de la empresa
- **Misión**: Propósito y enfoque actual
- **Políticas de Calidad**: Compromisos con la calidad del servicio
- **Ubicación Física**: Dirección y datos de contacto

### FAQ

Sistema de preguntas frecuentes organizadas por categorías (General, Técnico, Cuenta) con un diseño de acordeón que permite expandir/contraer las respuestas.

### Login

Formulario de inicio de sesión con:
- Validación de campos
- Opción de "Recordarme"
- Recuperación de contraseña
- Inicio de sesión con redes sociales (funcionalidad pendiente de implementación)

## Seguridad

- Las contraseñas nunca se almacenan en texto plano
- Las comunicaciones con la API utilizan tokens JWT para autenticación
- Las sesiones tienen un tiempo de expiración configurable

## Estado Actual

La aplicación se encuentra en un estado avanzado de desarrollo:
- La estructura de componentes está completamente implementada
- El diseño responsivo está optimizado con Bootswatch LUX
- Las vistas estáticas están completas y funcionando
- Servicios para comunicación con API implementados
- Sistema de autenticación basado en JWT implementado
- Manejo de errores y estados de carga implementados
- Navegación entre componentes funciona correctamente

## Próximos Pasos

1. Conectar la aplicación a una API Laravel real (actualmente trabaja con datos locales)
2. Implementar funcionalidades adicionales:
   - Panel de administración
   - Gestión de usuarios
   - Sistema de notificaciones
3. Agregar tests unitarios y end-to-end
4. Optimizar para producción (lazy loading, minificación, etc.)
5. Implementar PWA (Progressive Web App) para funcionamiento offline

## Contacto

Para más información o soporte, contactar a:
- Email: soporte@angularlaravelapp.com
- Teléfono: +XX XXX XXX XXX