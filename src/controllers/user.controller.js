const userService = require('../services/user.service');

// Controlador para crear nuevos usuarios
//crea un nuevo usuario en el sistema
exports.createUser = async (req, res) => {
    try { 
        //extraer datos del cuerpo de la peticion
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        //llamar al servicio para crear el usuario
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        //respuesta exitosa
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (err) {
        //manejo de errores del servidor
        res.status(500).json({ message: err.message });
    }
};

// Obtener todos los usuarios asociados a un administrador
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        //obtener ID del administrador desde el token
        const admin_from_token = req.user.id; // del middleware de autenticación
        const { email } = req.query; // filtro opcional
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message:  'Error al obtener los usuarios' });
    }
};

// Obtener todos los usuarios por rol
exports.getAllUsersByRolId = async (req, res) => {
    try {
        //consultar usuarios por rol mediante el servicio
        const users = await userService.getAllUsersByRolId(req.params.id);
        //retornar respuesta exitosa
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message:  'Error al obtener los usuarios por rol' });
    }
};

// Actualizar un usuario existente
exports.updateUser = async (req, res) => {
        const { id } = req.params;
        const { nombre, email, rol_id, administrador_id } = req.body;
        const admin_from_token = req.user.id;
try {
    //llamar al servicio para actualizar el usuario
    const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
    //retornar respuesta exitosa 
    res.status(200).json({ message: 'El usuario ha sido actualizado con éxito', user });
} catch (err) {
        res.status(500).json({ message: err.message });
     }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
        const { id } = req.params;
        const admin_from_token = req.user.id;
        try {
            //llamar al servicio para eliminar el usuario
            const result = await userService.deleteUser(id, admin_from_token);
            res.status(200).json(result);
        }catch (err) {
        res.status(500).json({ message: err.message });
    }
};

