const authService = require('../services/auth.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Registrar nuevo usuario (versión actualizada)
exports.register = async (req, res) => {
    const { nombre, email, password, rol_id = 2, administrador_id = null } = req.body;

    try {
        // 1. Validar campos obligatorios
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
        }

        // 2. Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // 3. Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Crear nuevo usuario con todos los campos
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id,
            role: 'USER' // Mantén esto si lo usas para JWT
        });

        // 5. Generar token JWT
        const token = jwt.sign(
            { 
                id: newUser.id, 
                role: newUser.role,
                nombre: newUser.nombre // Agrega nombre al token si lo necesitas
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: newUser.id,
                nombre: newUser.nombre,
                email: newUser.email
            }
        });

    } catch (err) {
        console.error('Error en registro:', err);
        res.status(500).json({ 
            message: 'Error al registrar usuario',
            error: process.env.NODE_ENV === 'development' ? err.message : null
        });
    }
};

// Iniciar sesión (se mantiene igual)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};