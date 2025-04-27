const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

// Definimos el modelo 'UserProyect' para la tabla intermedia 'usuarios_proyectos'
// Esta tabla establece una relación muchos a muchos entre usuarios y proyectos
const UserProyect = sequelize.define('usuarios_proyectos', {
    // ID autoincremental (pero no está definido como clave primaria, lo cual puede ser un error)
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: false, 
        autoIncrement: true 
    },
    // Campo 'usuario_id', clave foránea que referencia a la tabla 'usuarios'
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  // No puede ser nulo
        references: { 
            model: 'usuarios',  
            key: 'id'  // Hace referencia a la clave primaria de la tabla 'usuarios'
        }
    },
    // Campo 'proyecto_id', clave foránea que referencia a la tabla 'proyectos'
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  // No puede ser nulo
        references: { 
            model: 'proyectos', 
            key: 'id'  // Hace referencia a la clave primaria de la tabla 'proyectos'
        }
    },
}, {
    timestamps: false,
    tableName: 'usuarios_proyectos',
});

module.exports = UserProyect;
