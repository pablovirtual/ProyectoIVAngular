const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/angular-laravel-app')));

// For all GET requests, send back index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-laravel-app/index.html'));
});

// Start the app by listening on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
