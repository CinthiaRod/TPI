//Funcion para manejar errores
const errorMiddleware = (err, req, res, next) => {
    console.error('Error: ', err.message); // Muestra el mensaje de error en la consola del servidor
    
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message }); // Envía una respuesta de error al cliente
};

//Exportar modulo
module.exports = errorMiddleware;