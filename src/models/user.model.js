const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Se define el modelo de usuarios
const User = sequelize.define('usuarios', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }, // "unique" que debe ser única :)
    password: { type: DataTypes.STRING, allowNull: false },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'roles', key: 'id' }
    },
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'usuarios', key: 'id'}
    }
}, {
    timestamps: false,
    tableName: 'usuarios',
});
// Exportamos el modelo de usuarios
module.exports =  User;