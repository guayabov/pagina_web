const Project = require('../models/project.model');
const User = require('../models/user.model');

// Crear un proyecto
exports.createProject = async ({ nombre, descripcion, administrador_id, admin_from_token }) => {
    try {
        // Validar si el administrador_id corresponde al usuario autenticado
        if (administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, el proyecto debe ser creado por el administrador autenticado');
        }

        const newProject = await Project.create({
            nombre,
            descripcion,
            administrador_id
        });

        return newProject;
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

// Obtener todos los proyectos con sus relaciones
exports.getAllProjects = async () => {
    try {
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador',
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Obtener un proyecto por ID
exports.getProjectsByUserId = async (id) => {
    try {
        const project = await Project.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'usuarios',
                    attributes: ['id', 'nombre', 'email'],
                    through: { attributes: [] }
                }
            ]
        });
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        return project;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Asignar usuarios a un proyecto
exports.assignUsersToProject = async ({ projectId, usersIds }) => {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error('Proyecto no encontrado');

    const users = await User.findAll({ where: { id: usersIds } });
    if (users.length !== usersIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(users);

    return await Project.findByPk(projectId, {
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ]
    });
};

// Eliminar un usuario de un proyecto
exports.removeUserFromProject = async ( data ) => {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error('Proyecto no encontrado');

    const user = await User.findByPk(userId);
    if (!user) throw new Error('Usuario no encontrado');

    await project.removeUsuario(user);
};

// Actualizar un proyecto
exports.updateProject = async (id, nombre, descripcion, administrador_id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) throw new Error('Proyecto no encontrado');

        await project.update({ nombre, descripcion, administrador_id });
        return project;
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

// Eliminar un proyecto
exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) { throw new Error('Proyecto no encontrado');} 

        await project.destroy();
        return { message: 'Proyecto eliminado exitosamente' };
    } catch (error) {
        throw new Error(error.message || 'Error al eliminar el proyecto');
    }
};
