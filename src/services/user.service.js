const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Crear nuevo usuario
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ where: { email } });
        if (userExists) { // <-- aquí estaba mal el condicional (!userExists)
            throw new Error('El usuario ya existe');
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser;
    } catch (err) {
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Obtener todos los usuarios de un administrador
exports.getAllUsersByAdministradorId = async (administrador_id, email) => {
    try {
        const whereClause = { administrador_id };
        if (email) {
            whereClause.email = email;
        }

        const users = await User.findAll({
            where: whereClause,
            attributes: { exclude: ['password'] }
        });

        return users;
    } catch (err) { // aquí estaba mal la sintaxis `} catch {err} {`
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Obtener usuarios por rol
exports.getAllUsersByRolId = async (rol_id) => {
    try {
        const users = await User.findAll({
            where: { rol_id },
            attributes: { exclude: ['password'] }
        });

        return users;
    } catch (err) {
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Actualizar usuario
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }

        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error('El email ya está en uso');
            }
        }

        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });

        return user;
    } catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

// Eliminar usuario
exports.deleteUser = async (id, admin_from_token) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }

        await user.destroy();
        return { message: 'Usuario eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};
