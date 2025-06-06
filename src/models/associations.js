const User = require('./user.model');
const Project = require('./project.model'); // cambia Proyect por Project
const UserProject = require('./userProject.model');

// Relaciones muchos a muchos entre usuarios y proyectos
User.belongsToMany(Project, {
    through: UserProject,
    foreignKey: 'usuario_id',
    as: 'proyectos'
});

Project.belongsToMany(User, {
    through: UserProject,
    foreignKey: 'proyecto_id',
    as: 'usuarios'
});

// Relación de un proyecto con su administrador
Project.belongsTo(User, {
    foreignKey: 'administrador_id',
    as: 'administrador'
});

module.exports = { User, Project, UserProject };
