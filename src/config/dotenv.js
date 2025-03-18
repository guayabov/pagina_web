
const dotenv = require('dotenv');

// Carga las variables de entorno 
dotenv.config();

// Exporta un objeto con las configuraciones del entorno
module.exports = {
    PORT: process.env.PORT, // Puerto en el que se ejecutará el servidor

    // Datos de conexión a la base de datos
    DB_NAME: process.env.DB_NAME,      // Nombre de la base de datos
    DB_USER: process.env.DB_USER,      // Usuario de la base de datos
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña de la base de datos
    DB_HOST: process.env.DB_HOST,      // Dirección del servidor de la base de datos
    DB_PORT: process.env.DB_PORT,      // Puerto de la base de datos

    // Clave secreta para la autenticación
    JWT_SECRET: process.env.JWT_SECRET
};
