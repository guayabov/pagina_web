// Importamos DataTypes de Sequelize para definir los tipos de datos
const { DataTypes } = require('sequelize');

// Importamos la configuración de la base de datos (corrigiendo el error en 'require')
const sequelize = require('../config/database');

// Definimos el modelo 'rolePermission' para la tabla intermedia 'roles_permisos'
// Esta tabla se usa para la relación muchos a muchos entre 'roles' y 'permisos'
const rolePermission = sequelize.define('roles_permisos', {
    // Campo 'rol_id', que hace referencia a la tabla 'roles'
    rol_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,  // No puede ser nulo
        references: { 
            model: 'roles',  // Hace referencia a la tabla 'roles'
            key: 'id'        // Se relaciona con la columna 'id' de 'roles'
        } 
    },
    // Campo 'permiso_id', que hace referencia a la tabla 'permisos'
    permiso_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,  // No puede ser nulo
        references: { 
            model: 'permisos',  // Hace referencia a la tabla 'permisos'
            key: 'id'           // Se relaciona con la columna 'id' de 'permisos'
        } 
    }
}, {
    // Deshabilitamos las marcas de tiempo automáticas (createdAt, updatedAt)
    timestamps: false,  
    // Especificamos el nombre exacto de la tabla en la base de datos
    tableName: 'roles_permisos',
});

// Exportamos el modelo para poder usarlo en otras partes de la aplicación
module.exports = rolePermission;
