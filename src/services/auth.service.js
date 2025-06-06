const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Se instala con: npm install bcryptjs
const dotenv = require('dotenv');
const User = require('../models/user.model');
const RolePermission = require('../models/rolePermission.model');

dotenv.config();

// Llave secreta desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Servicio
exports.loginUser = async (email, password) => {
    try {
        // Verifica si el usuario existe
        const user = await User.findOne({ where: { email } });  
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar si la contraseña es correcta 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        // Consultar los permisos del rol
        const rolePermission = await RolePermission.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['permiso_id']
        });

        const permisos = rolePermission.map(rp => rp.permiso_id);

        // Generar token jwt
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return token;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};
