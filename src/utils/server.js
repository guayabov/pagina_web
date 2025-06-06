const app = require('../../app');
const dotenv = require('dotenv');
const sequelize = require('../config/database');
require('../models/associations');

dotenv.config(); // Corregido

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
   .then(() => {
       console.log('Conexión a PostgreSQL con Sequelize establecida');

       // Sincronizar la base de datos
       return sequelize.sync({ force: false });
   })
   .then(() => {
       console.log('Base de datos sincronizada');

       // Iniciar el servidor
       app.listen(PORT, () => {
           console.log(`Servidor corriendo en http://localhost:${PORT}`);
       });
   })
   .catch(err => {
       console.error('Error al conectar o sincronizar la base de datos:', err);
   });
