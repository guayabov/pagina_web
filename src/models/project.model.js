// Importamos DataTypes de Sequelize para definir los tipos de datos
const { DataTypes } = require('sequelize');

// Importamos la configuración de la base de datos
const sequelize = require('../config/database');

// Definimos el modelo 'Proyect' para la tabla 'proyectos'
const Proyect = sequelize.define('proyectos', {
    // Definimos el campo 'id' como clave primaria
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,  
        autoIncrement: true 
    },
    // Campo 'nombre' del proyecto (obligatorio)
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // Campo 'descripcion' del proyecto (obligatorio)
    descripcion: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }, 
    // Campo 'fecha_creacion' con valor por defecto de la fecha actual
    fecha_creacion: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
    }, 
    // Campo 'administrador_id', que hace referencia a la tabla 'usuarios'
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: 'usuarios', // Indica que este campo hace referencia a la tabla 'usuarios'
            key: 'id'         // Hace referencia a la columna 'id' de la tabla 'usuarios'
        } 
    }
}, {
    // Deshabilitamos las marcas de tiempo automáticas (createdAt, updatedAt)
    timestamps: false,
    // Especificamos el nombre exacto de la tabla en la base de datos
    tableName: 'proyectos',
    // Hook para ajustar la zona horaria después de crear un registro
    hooks: {
        afterCreate: (proyect, options) => {
            if (proyect.fecha_creacion) {  
                proyect.fecha_creacion.setHours(proyect.fecha_creacion.getHours() - 5); 
                // Se restan 5 horas para ajustar a la zona horaria de Colombia
            }
        }
    }
});

// Exportamos el modelo para poder usarlo en otras partes de la aplicación
module.exports = Proyect;
