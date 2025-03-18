// Importamos Express para manejar las rutas
const express = require('express');

// Creamos un router de Express para definir nuestras rutas
const router = express.Router();

// Importamos el controlador de autenticación
const authController = require('../controller/auth.controller');

// Ruta para iniciar sesión
// Se usa el método POST porque se enviarán datos en el cuerpo de la solicitud (email y contraseña)
router.post('/auth/login', authController.login);

module.exports = router;
