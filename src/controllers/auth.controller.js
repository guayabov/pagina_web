const authService = require('../services/auth.service'); // Importa el servicio de autenticación

// Iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body; // Extrae el email y la contraseña del cuerpo de la solicitud

    try {
        // Llama al servicio de autenticación para validar al usuario y obtener un token
        const token = await authService.loginUser(email, password);

        // Responde con un mensaje de éxito y el token generado
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });

    } catch (err) {
        // Captura cualquier error y responde con un estado 400 (solicitud incorrecta)
        res.status(400).json({ message: err.message });
    }
};
