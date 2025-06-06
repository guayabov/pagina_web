const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateToken, checkRole } = require('../middlewares/auth.middlewares');
const ROLES = require('../utils/constants');

// Rutas de proyectos
router.post('/projects', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getAllProjects);
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN, ROLES.USER]), projectController.getProjectById);
router.put('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);
router.delete('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);

// Rutas de asignación de usuarios
router.post('/projects/:id/users', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assignUsersToProject);
router.delete('/projects/:id/users/:userId', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject);

module.exports = router;