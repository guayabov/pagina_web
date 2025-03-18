const User = require('../models/user.model'); 
const bcrypt = require('bcryptjs'); 

// Función para crear un nuevo usuario en la base de datos
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        // Verificar si el usuario ya existe en la base de datos
        const userExists = await User.findOne({ where: { email } });
        if (userExists) { 
            throw new Error('El usuario ya existe'); 
        }

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario con la contraseña encriptada
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser; // Retornar el usuario creado
    } catch (err) {
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Función para actualizar un usuario existente
exports.updateUser = async (id, nombre, email, password, rol_id, administrador_id) => {
    try {
        // Buscar el usuario por ID
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Si hay una nueva contraseña, la hasheamos antes de actualizar
        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Actualizar los datos del usuario
        await user.update({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return user; // Retornar el usuario actualizado
    } catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

// Función para eliminar un usuario por su ID
exports.deleteUser = async (id) => {
    try {
        // Buscar el usuario por ID
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Eliminar el usuario
        await user.destroy();

        return { message: 'Usuario eliminado correctamente' }; 
    } catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};
