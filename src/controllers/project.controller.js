const projectService = require('../services/project.service');
const Project = require('../models/project.model');
const User = require('../models/user.model'); 


// Crear nuevo proyecto
exports.createProject = async (req, res) => {
    try {
        // Verificar que el body existe
        if (!req.body) {
            return res.status(400).json({ 
                success: false,
                message: 'El cuerpo de la solicitud no puede estar vacío' 
            });
        }

        // Extraer y limpiar datos
        const { nombre, descripcion, administrador_id } = req.body;
        
        // Validación básica en el controlador (adicional a las validaciones del modelo)
        if (!nombre?.trim()) {
            return res.status(400).json({ 
                success: false,
                message: 'El nombre del proyecto es requerido' 
            });
        }
        
        if (!descripcion?.trim()) {
            return res.status(400).json({ 
                success: false,
                message: 'La descripción del proyecto es requerida' 
            });
        }
        
        if (!administrador_id) {
            return res.status(400).json({ 
                success: false,
                message: 'El ID del administrador es requerido' 
            });
        }

        // Verificar que el usuario autenticado es el administrador
        if (parseInt(administrador_id) !== req.user.id) {
            return res.status(403).json({ 
                success: false,
                message: 'No tienes permiso para crear proyectos para otro usuario' 
            });
        }

        // Crear el proyecto
        const newProject = await Project.create({
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            administrador_id
        });

        // Respuesta exitosa
        return res.status(201).json({
            success: true,
            message: 'Proyecto creado exitosamente',
            data: newProject
        });

    } catch (error) {
        console.error('Error al crear proyecto:', error);
        
        // Manejo específico para errores de validación de Sequelize
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors
            });
        }

        // Error general del servidor
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al crear el proyecto',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
// Obtener todos los proyectos (general o para administradores si luego se filtra)
exports.getAllProjects = async (req, res) => {
    try {
        //obtener todos los proyectos mediante el servicio
        const projects = await projectService.getAllProjects();
        //retornar respuesta exitosa 
        res.status(200).json({ message: 'Proyectos obtenidos con éxito', projects });
    } catch (err) {
        //manejar errores
        res.status(500).json({ message: err.message });
    }
};

// Asignar usuarios a un proyecto
exports.assignUsersToProject = async (req, res) => {
    try {
        //obtener datos de asignacion del cuepo de la peticion
        const data = req.body;
        //llamar al servicio para realizar la asignacion
        const project = await projectService.assignUsersToProject(data);
        //retornar respuesta exitosa
        res.status(200).json({ message: 'usuarios asignados al proyecto con exito', project });
    } catch (err) {
        //manejar errores
        res.status(500).json({ message: err.message });
    }
};

//elimina un usuario de un proyecto
exports.removeUserFromProject = async (req, res) => {
    try {
        //ontener datos de desvimculacion del cuerpo de la peticion
        const data = req.body;
        //llmar al servivio para realizar la eliminacion
        const result = await projectService.removeUserFromProject(data);
        //respuesta exitosa
        res.status(200).json({ message: 'usuario eliminado del proyecto con exito', result });
    } catch (err){
        //manejar errores
        res.status(500).json({ message: err.message });
    }
};

//obtiene un proyecto por su ID
exports.getProjectById = async (req, res) => {
    try {
        //obtiene el id de parametro a numero
        const id = Number(req.params.id);
        //obtener el proyecto mediante el servicio
        const project = await projectService.getProjectsByUserId(id);
        //retornar respuesta exitosa
        res.status(200).json({ message: 'Proyecto obtenido con éxito', project });
    } catch (err) {
        //manejo errores
        res.status(500).json({ message: err.message });
    }
};

// Actualizar informacion del proyecto
exports.updateProject = async (req, res) => {
    try {
        //obtener ID del proyecto de los parametros de ruta
        const id = req.params.id;
        //extraer datos de actualizacion del cuerpo de peticion
        const { nombre, descripcion, administrador_id } = req.body;
        //lmar al servicio para realizar la actualizacion
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);
        //retornar respuesta exitosa
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (err) {
        //manejo de errores
        res.status(500).json({ message: err.message });
    }
};

// Eliminar proyecto
exports.deleteProject = async (req, res) => {
    try {
        //obtener ID del proyecto de los parametros de ruta
        const id = req.params.id;
        //llmar al servicio para eliminar el proyecto
        const result = await projectService.deleteProject(id);
        //respuesta exitosa
        res.status(200).json(result);
    } catch (err) {
        //manejo de errores
        res.status(500).json({ message: err.message });
    }
};
