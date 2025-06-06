// middlewares/error.middleware.js

const errorHandler = (err, req, res, next) => {
    //registro detallado del error
    console.error('Error:', err.stack || err.message);
    // determinar el codigo de estado adecuado
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    // enviar respuesta al cliente
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Ocurrió un error en el servidor',
    });
};

module.exports = errorHandler;
