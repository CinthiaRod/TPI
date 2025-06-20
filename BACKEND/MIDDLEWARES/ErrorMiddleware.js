const errorMiddleware = (err, req, res, next) => {
    console.error('Error: ', err.message); // Muestra el mensaje de error en la consola del servidor
    res.status(500).json({ error: "Ocurrio un error en el servidor" }); // Envía una respuesta de error al cliente
};

module.exports = errorMiddleware;