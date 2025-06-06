const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// 1. Primero crea la configuración
const sequelizeConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    timezone: '-05:00'
  }
};

// 2. Luego crea la instancia de Sequelize
const sequelizeInstance = new Sequelize(sequelizeConfig.development);

// 3. Exporta ambas cosas PERO mantén sequelize como exportación principal
module.exports = sequelizeInstance; // Exportación principal para tus modelos
module.exports.config = sequelizeConfig; // Para Sequelize CLI