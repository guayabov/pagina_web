const { DataTypes } = require('sequelize');

// Importamos la configuración de la base de datos 
const sequelize = require('../config/database');

// Definimos el modelo 'User' para representar la tabla 'usuarios'
const User = sequelize.define('usuarios', {
    // Campo 'id' como clave primaria autoincremental
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,  // Define que es la clave primaria
        autoIncrement: true  // Se incrementará automáticamente
    },
    // Campo 'nombre', no puede ser nulo
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // Campo 'email', único y obligatorio
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true  // No se pueden repetir correos en la base de datos
    },
    // Campo 'password', obligatorio
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // Campo 'rol_id', hace referencia a la tabla 'roles'
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  // No puede ser nulo
        references: { 
            model: 'roles',  // Relación con la tabla 'roles'
            key: 'id'        // Relación con la columna 'id' de 'roles'
        }
    }, 
    // Campo 'administrador_id', hace referencia a otro usuario administrador
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  // No puede ser nulo
        references: { 
            model: 'usuarios',  // Relación con la misma tabla 'usuarios'
            key: 'id'           // Relación con la columna 'id' de 'usuarios'
        }
    }
}, {
    timestamps: false,
    tableName: 'usuarios',
});

// Exportamos el modelo para poder usarlo en otras partes de la aplicación
module.exports = User;
