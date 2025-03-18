// Importamos Express y CORS
const express = require('express');
const cors = require('cors');

// Creamos la aplicación de Express
const app = express();

// Habilitamos el uso de JSON en las solicitudes
app.use(express.json());

// Habilitamos CORS para permitir solicitudes desde diferentes dominios
app.use(cors());

// Importamos las rutas del proyecto
const userRoutes = require('./routes/user.routes');  // Rutas relacionadas con usuarios
const authRoutes = require('./routes/auth.routes');  // Rutas para autenticación (login, registro)
const projectRoutes = require('./routes/project.routes'); // Rutas para proyectos

// Habilitamos las rutas en la API bajo el prefijo "/api/v1"
app.use('/api/v1/users', userRoutes);  // Rutas para usuarios
app.use('/api/v1/auth', authRoutes);   // Rutas para autenticación
app.use('/api/v1/projects', projectRoutes); // Rutas para proyectos

// Exportamos la aplicación para poder usarla en otros archivos (como el servidor principal)
module.exports = app;
