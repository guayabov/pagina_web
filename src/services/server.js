const sequelize = require('./config/db'); // Importamos la configuración de la base de datos
const app = require('./app'); // Importamos la aplicación Express
const dotenv = require('dotenv');
require('./models/associations'); // Importamos las asociaciones entre modelos

dotenv.config(); 

const PORT = process.env.PORT || 3000; // Definimos el puerto en el que correrá el servidor

// Autenticación con la base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize'); // Mensaje de éxito si la conexión es correcta
        
        // Iniciamos el servidor en el puerto definido
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje indicando que el servidor está corriendo
        });
    })
    .catch(err => console.error('Error conectando a la base de datos:', err)); // Captura y muestra errores de conexión

// Sincronización de modelos con la base de datos sin forzar cambios
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada'); // Mensaje de éxito si la sincronización es correcta
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos', err); // Captura y muestra errores de sincronización
    });
