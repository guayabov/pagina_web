const jwt = require('jsonwebtoken'); // Importamos la librería jsonwebtoken para generar tokens JWT
const bcrypt = require('bcryptjs'); // Importamos bcryptjs para encriptar y comparar contraseñas
const dotenv = require('dotenv'); // Importamos dotenv para manejar variables de entorno

// Importamos los modelos necesarios
const User = require('../models/user.model'); // Modelo de usuario
const RolePermission = require('../models/rolePermission.model'); // Modelo de permisos por rol

dotenv.config(); // Cargamos las variables de entorno

const SECRET_KEY = process.env.JWT_SECRET; // Obtenemos la clave secreta para generar el token

// Exportamos el servicio de autenticación que recibe email y contraseña
exports.loginUser = async (email, password) => {
    try {
        // Verifica que el usuario existe en la base de datos
        const user = await User.findOne({ where: { email } }); // Busca el usuario por email
        if (!user) {
            throw new Error('Usuario no encontrado'); // Lanza un error si el usuario no existe
        }

        // Verifica si la contraseña ingresada es correcta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { // Se cambió la condición incorrecta
            throw new Error('Contraseña incorrecta'); // Lanza un error si la contraseña no es válida
        }

        // Consultar permisos del rol del usuario
        const rolePermissions = await RolePermission.findAll({
            where: { rol_id: user.rol_id }, // Busca los permisos según el rol del usuario
            attributes: ['permiso_id'] // Solo obtiene los IDs de los permisos
        });

        // Extrae los IDs de los permisos en un array
        const permisos = rolePermissions.map(rp => rp.permiso_id);

        // Genera un token con los datos del usuario y sus permisos
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos }, // Payload del token
            SECRET_KEY, // Clave secreta
            { expiresIn: '1h' } // Expiración del token en 1 hora
        );

        return token; // Retorna el token generado
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión'); // Manejo de errores
    }
};
