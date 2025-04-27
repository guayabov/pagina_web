const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.createUser = async (nombre, email, password, rol_id) => {
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id
        });

        return newUser;
    } catch (err) {
        console.log(err);
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Se exporta el servicio para obtener todos los usuarios de un administrador
exports.getAllUsersByAdministradorId = async (administrador_id, email) => {
    try {
         // whereClause para filtrar los usuarios
        const whereClause = { administrador_id };
        if (email) {
            whereClause.email = email;
        }
        //buscams los usuarios que cumplan con el whereClause
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ['password']}});
        return users;
    } catch {err} {
        throw new Error(`Error al obtenernlos usuarios: ${err.message}`);
    }
};

// va a obtener la lista de usuarios que tienen  un rol en especifico y se exporta el servicio
exports.getAllUsersByRolId = async (rol_id) => {
    try {
        const users = await User.findAll({ where: {rol_id}, attributes: { exclude: ['password']}});// se excluye la contraseña para no compromenter datos sensibles
        return users;
    } catch (err) {
        throw new Error(`Error al obtener  los usuarios: ${err.message}`);
    }
};

// Se exporta el servicio para actualizar usuarios
exports.updateUser = async (id, nombre, email, rol_id) => {
    try {
        const user = await User.findByPk(id); // va a hacer la busqueda por id || await para que complete la operacion antes de continuar


        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (email && email !== user.email) { // va a verificar si el email es el mismo que tenia 
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error('El email ya esta en uso');
            }
        }
        await user.update({
            nombre,
            email,
            rol_id
        });

        return user;
    } catch (err) {
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

// Se exporta el servicio para eliminar usuarios
exports.deleteUser = async (id, admin_from_token) => {
    try {
        const user = await User.findByPk(id);
        if (user.administrador_id !== admin_from_token) { //primero verifica que si pueda eliminarlo
            throw new Error('Acceso denegado, este ususario no esta bajo su administración');
        }

        //Verifica que el usuario exista
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        await user.destroy();//Elimina el usuario
        return { message: 'Usuario eliminado con éxito'};
    }catch (err) {
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};


// Servicio para buscar un usuario por ID (CORRECTO) ultimo agregado
exports.getUserById = async (userId) => {
    const user = await User.findByPk(userId, { // <- ¡Corrige "findByPK" a "findByPk"!
        attributes: ['id', 'nombre', 'email', 'rol_id'], // Campos a retornar
        raw: true // Para obtener datos planos (no una instancia de Sequelize)
    });
    if (!user) {
        throw new Error("Usuario no encontrado"); // Lanza error si no existe
    }
    return user;
};