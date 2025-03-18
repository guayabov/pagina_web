// Importamos los modelos necesarios
const User = require('./user.model');
const Proyect = require('./proyect.model');
const UserProyect = require('./userproyect.model');

// Definimos la relación muchos a muchos entre usuarios y proyectos
// Se usa la tabla intermedia UserProyect para gestionar la relación
User.belongsToMany(Proyect, { 
    through: UserProyect,          // Especificamos la tabla intermedia
    foreignKey: 'usuario_id',      // Clave foránea en la tabla intermedia
    as: 'proyectos'                // Alias para referirse a los proyectos de un usuario
});

Proyect.belongsToMany(User, { 
    through: UserProyect,          // Especificamos la tabla intermedia
    foreignKey: 'proyecto_id',     // Clave foránea en la tabla intermedia
    as: 'usuarios'                 // Alias para referirse a los usuarios de un proyecto
});

// Definimos la relación entre proyectos y administradores
// Un proyecto puede tener un administrador, que es un usuario
Proyect.belongsToMany(User, { 
    foreignKey: 'administrador_id', // Clave foránea que representa al administrador del proyecto
    as: 'administrador'             // Alias para acceder al administrador del proyecto
});

// Exportamos los modelos para que puedan ser usados en otras partes del código
module.exports = { User, Proyect, UserProyect };
