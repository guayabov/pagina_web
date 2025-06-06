const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Importar rutas
const userRoutes = require('./routers/user.routes');
const authRoutes = require('./routers/auth.routes'); 
const projectRoutes = require('./routers/project.routes'); // Renombrado

// Usar rutas con prefijo común
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', projectRoutes);

// Middleware de errores
const errorHandler = require('./middlewares/error.middleware');
app.use(errorHandler); // debe ir al final

module.exports = app;
