const Project = require('../models/project.model'); // Importamos el modelo de proyectos

// Servicio para crear un nuevo proyecto
exports.createProject = async (name, description, administrador_id) => {
    try {
        // Crear un nuevo proyecto en la base de datos
        const newProject = await Project.create({ nombre: name, descripcion: description, administrador_id });
        return newProject; // Retornar el proyecto creado
    } catch (error) {
        throw new Error(error.message || 'Error al crear el proyecto'); // Manejo de errores
    }
};

// Servicio para obtener todos los proyectos
exports.getAllProjects = async () => {
    try {
        // Obtener todos los proyectos de la base de datos
        const projects = await Project.findAll();
        return projects; // Retornar la lista de proyectos
    } catch (error) {
        throw new Error(error.message || 'Error al obtener los proyectos'); // Manejo de errores
    }
};

// Servicio para obtener un proyecto por ID
exports.getProjectById = async (projectId) => {
    try {
        // Buscar un proyecto por su ID
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Lanza un error si el proyecto no existe
        }
        return project; // Retornar el proyecto encontrado
    } catch (error) {
        throw new Error(error.message || 'Error al obtener el proyecto'); // Manejo de errores
    }
};

// Servicio para actualizar un proyecto por ID
exports.updateProject = async (projectId, updatedData) => {
    try {
        // Buscar el proyecto a actualizar
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Lanza un error si el proyecto no existe
        }

        // Actualizar los datos del proyecto
        await project.update(updatedData);
        return project; // Retornar el proyecto actualizado
    } catch (error) {
        throw new Error(error.message || 'Error al actualizar el proyecto'); // Manejo de errores
    }
};

// Servicio para eliminar un proyecto por ID
exports.deleteProject = async (projectId) => {
    try {
        // Buscar el proyecto a eliminar
        const project = await Project.findByPk(projectId);
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Lanza un error si el proyecto no existe
        }

        // Eliminar el proyecto de la base de datos
        await project.destroy();
        return { message: 'Proyecto eliminado correctamente' }; // Mensaje de éxito
    } catch (error) {
        throw new Error(error.message || 'Error al eliminar el proyecto'); // Manejo de errores
    }
};
