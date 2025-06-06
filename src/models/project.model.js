const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// Definimos el modelo 'Project' que representa la tabla 'proyectos'

const Project = sequelize.define('proyectos', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true  // El ID se genera automáticamente
    },  
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false, // No se permite que sea nulo
        validate: {
            notNull: { msg: 'El nombre del proyecto es requerido' },
            notEmpty: { msg: 'El nombre no puede estar vacío' },
            len: {
                args: [3, 100], // Longitud entre 3 y 100 caracteres
                msg: 'El nombre debe tener entre 3 y 100 caracteres'
            }
        }
    }, 
    descripcion: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notNull: { msg: 'La descripción es requerida' },
            notEmpty: { msg: 'La descripción no puede estar vacía' },
            len: {
                args: [10, 500],
                msg: 'La descripción debe tener entre 10 y 500 caracteres'
            }
        }
    }, 
    fecha_creacion: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW // Fecha de creación automática (actual)
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Cada proyecto debe tener un administrador
        references: { 
            model: 'usuarios', 
            key: 'id' 
        },
        validate: {
            notNull: { msg: 'El administrador es requerido' },
            isInt: { msg: 'El ID del administrador debe ser un número entero' }
        }
    }
}, {
    timestamps: false,
    tableName: 'proyectos',
    hooks: {
        beforeCreate: (project) => {
            if (project.nombre) {
                project.nombre = project.nombre.trim();
            }
            if (project.descripcion) {
                project.descripcion = project.descripcion.trim();
            }
        },
        afterCreate: (project) => {
            if (project.fecha_creacion) {
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

module.exports = Project;