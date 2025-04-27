// Importamos las dependencias necesarias
const jwt = require('jsonwebtoken');  // Librería para trabajar con JSON Web Tokens (JWT)
const dotenv = require('dotenv');     // Librería para gestionar variables de entorno
dotenv.config();                      // Cargar las variables de entorno desde el archivo .env

// Se lee la clave secreta del archivo .env
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para autenticar el token de acceso
const authenticateToken = (req, res, next) => {
    // Intentamos obtener el token desde la cabecera "Authorization" (en el formato "Bearer <token>")
    const token = req.header('Authorization')?.split(' ')[1];

    // Si no hay token en la cabecera, se devuelve un error de autorización
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' });
    }

    // Verificamos el token usando la clave secreta, y decodificamos el payload
    jwt.verify(token, SECRET_KEY, (err, user) => {
        // Si el token no es válido o ha expirado, se responde con un error de "Token no válido"
        if (err) {
            return res.status(403).json({ message: 'Token no valido' });
        }
        // Si el token es válido, se adjunta la información del usuario decodificada al objeto "req"
        req.user = user;
        // Continuamos con la siguiente función middleware o la ruta
        next();
    });
};

// Middleware para verificar si el usuario tiene un rol permitido
const checkRole = (roles) => {
    // Devuelve una función middleware que recibe la solicitud y el objeto de respuesta
    return (req, res, next) => {
        // Obtenemos el rol del usuario desde el objeto "req.user" que fue añadido en "authenticateToken"
        const { rol_id } = req.user;

        // Comprobamos si el rol del usuario está incluido en la lista de roles permitidos
        if (!roles.includes(rol_id)) {
            // Si el rol no está permitido, devolvemos un error de acceso denegado
            return res.status(403).json({ message: 'Acceso denegado, no tienes permiso para realizar esta acción' });
        }

        // Si el rol es válido, continuamos con la siguiente función middleware o la ruta
        next();
    };
};

// Exportamos ambos middlewares para poder usarlos en otras partes de la aplicación
module.exports = { authenticateToken, checkRole };
