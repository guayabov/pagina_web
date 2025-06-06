// Importar funciones de datos de Sequelize y tambien la instancia que se hizo en el database.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Se define el modelo de relación entre roles y permisos
const RolePermission = sequelize.define('roles_permisos', {
    rol_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' }},
    permiso_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'permisos', key: 'id' }}
}, {
    timestamps: false,
    tableName: 'roles_permisos',
});
// Exportamos el modelo de relación entre roles y permisos
module.exports = RolePermission;