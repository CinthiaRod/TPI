//Funcion para manejar errores
const errorMiddleware = (err, req, res, next) => {
    console.error('Error: ', err.message); // Muestra el mensaje de error en la consola del servidor
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message }); // Envía una respuesta de error al cliente
    
    //res.status(500).json({ error: err.message }); 
};

//Exportar modulo
module.exports = errorMiddleware;