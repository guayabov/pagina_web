
const dotenv = require('dotenv');

// Carga las variables de entorno 
dotenv.config();

// Exporta un objeto con las configuraciones del entorno
module.exports = {
    PORT: process.env.PORT, // El puerto en el que la aplicación escuchará (por ejemplo, 3000).
    DB_NAME: process.env.DB_NAME, // Nombre de la base de datosDB_NAME").
    DB_USER: process.env.DB_USER, // Usuario de la base de datos.
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña para acceder a la base de datos.
    DB_HOST: process.env.DB_HOST, // Dirección del servidor de la base de datos 
    DB_PORT: process.env.DB_PORT, // Puerto del servidor de la base de datos 
    JWT_SECRET: process.env.JWT_SECRET // Secreto utilizado para firmar los tokens JWT
};

