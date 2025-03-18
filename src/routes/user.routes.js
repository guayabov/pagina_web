// Importamos Express y creamos el router
const express = require('express');
const router = express.Router();

// Importamos el controlador de usuarios
const userController = require('../controllers/user.controller');

// Ruta para crear un nuevo usuario (POST)
router.post('/users', userController.createUser);

// Ruta para obtener todos los usuarios (GET)
router.get('/users', userController.getUsers);

// Ruta para obtener un usuario por su ID (GET)
router.get('/users/:id', userController.getUserById);

// Ruta para actualizar un usuario por su ID (PUT)
router.put('/users/:id', userController.updateUser);

// Ruta para eliminar un usuario por su ID (DELETE)
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
