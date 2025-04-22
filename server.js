const express = require('express');
const path = require('path');

// Crear la aplicación Express
const app = express();

// Configurar el directorio de archivos estáticos
app.use(express.static('dist/angular-laravel-app'));

// Manejar las rutas
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'dist/angular-laravel-app') });
});

app.get('/home', (req, res) => {
  res.sendFile('home.html', { root: path.join(__dirname, 'dist/angular-laravel-app') });
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: path.join(__dirname, 'dist/angular-laravel-app') });
});

app.get('/faq', (req, res) => {
  res.sendFile('faq.html', { root: path.join(__dirname, 'dist/angular-laravel-app') });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
