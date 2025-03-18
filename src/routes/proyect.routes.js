// Importamos Express y creamos el router
const express = require('express');
const router = express.Router();

// Importamos el controlador de proyectos
const projectController = require('../controllers/project.controller');

// Ruta para crear un nuevo proyecto (POST)
router.post('/projects', projectController.createProject);

// Ruta para obtener todos los proyectos (GET)
router.get('/projects', projectController.getProjects);

// Ruta para obtener un proyecto por su ID (GET)
router.get('/projects/:id', projectController.getProjectById);

// Ruta para actualizar un proyecto por su ID (PUT)
router.put('/projects/:id', projectController.updateProject);

// Ruta para eliminar un proyecto por su ID (DELETE)
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
