// Importa el servicio de usuarios que maneja la lógica de negocio
const userService = require('../services/user.service');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    try {
        // Extrae los datos del usuario desde el cuerpo de la solicitud
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        // Llama al servicio para crear el usuario con los datos proporcionados
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);

        // Responde con un estado 201 indicando que el usuario fue creado
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (err) {
        // En caso de error, responde con un estado 500 error interno del servidor
        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        // Extrae el ID del usuario desde los parámetros de la solicitud
        const { id } = req.params;

        // Extrae los datos actualizados desde el cuerpo de la solicitud
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        // Llama al servicio para actualizar el usuario
        const updatedUser = await userService.updateUser(id, nombre, email, password, rol_id, administrador_id);

        // Verifica si el usuario fue encontrado y actualizado
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Responde con un estado 200 indicando éxito en la actualización
        res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
    } catch (err) {
        // En caso de error, responde con un estado 500
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        // Extrae el ID del usuario desde los parámetros de la solicitud
        const { id } = req.params;

        // Llama al servicio para eliminar el usuario
        const deleted = await userService.deleteUser(id);

        // Verifica si el usuario fue encontrado y eliminado
        if (!deleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Responde con un estado 200 indicando éxito en la eliminación
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
        // En caso de error, responde con un estado 500
        res.status(500).json({ message: err.message });
    }
};


//Hacer edpoint de proyectos 