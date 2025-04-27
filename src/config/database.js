// Importa Sequelize, que es el ORM para manejar bases de datos
const { Sequelize } = require('sequelize');

// Importa dotenv para cargar variables de entorno 
const dotenv = require('dotenv');
dotenv.config(); 

// Crea una instancia de Sequelize con los datos de conexión a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nombre de la base de datos
    process.env.DB_USER,     // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña de la base de datos
    {
        host: process.env.DB_HOST,  // Dirección del servidor de la base de datos
        dialect: 'postgres',        // Tipo de base de datos (PostgreSQL)
        port: process.env.DB_PORT,  // Puerto de conexión a la base de datos
        logging: false,             // Desactiva los logs de Sequelize
        timezone: '-05:00'          // Configura la zona horaria
    }
);

// Función para autenticar la conexión con la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente en el servidor');
  })
  .catch(error => {
    console.error(' Error al conectar con la base de datos:', error);
  });

// Exporta la instancia de Sequelize para ser utilizada en otros módulos
module.exports = sequelize;
