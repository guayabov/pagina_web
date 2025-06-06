const jwt = require('jsonwebtoken');
//configura las variables de entorno desde el archivo .env
const dotenv = require('dotenv');
dotenv.config();
//clave secreta para firmar y verificar los tokend JWT
const SECRET_KEY = process.env.JWT_SECRET;
//middleware para autenticar tokens jwt
const authenticateToken = (req, res, next) => {
    //obtener el header de autorizacion
    const authHeader = req.header('Authorization');
    //verificar si el header existe
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }
    //separar el esquema barrer del token
    const [bearer, token] = authHeader.split(' ');
    // validar el formato del token
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Formato de token inválido. Use: Bearer <token>' });
    }
    // verifica el token jwt
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        //adjuntar los datos del usuario decoficados a la solicitus
        req.user = user;
        next();
    });
};
//verificar roles de usuario
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        //verificar si existe informacion de usuario en la solicitud
        if (!req.user?.rol_id) {
            return res.status(403).json({ message: 'Información de rol no disponible' });
        }
        //comprobar si el rol del usuarios esta en los permitidos
        if (!allowedRoles.includes(req.user.rol_id)) {
            return res.status(403).json({ 
                message: 'Acceso denegado. No tienes permisos para esta acción.' 
            });
        }
        next();
    };
};

module.exports = { authenticateToken, checkRole };