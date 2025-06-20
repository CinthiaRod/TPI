const express = require('express');
const dotenv = require('dotenv');
const bookRoutes = require('./ROUTES/bookRoutes');
const usersRoutes = require ('./ROUTES/usersRoutes')
const errorMiddleware = require('./MIDDLEWARES/ErrorMiddleware');

dotenv.config(); // Cargar variables de entorno desde .env 

const app = express();
const PORT = process.env.PORT || 3000; // Puerto configurable 

app.use(express.json()); // Middleware para parsear archivo JSON
app.use(express.static('PUBLIC'));

// Rutas de la API
app.use('/libros', bookRoutes); 
app.use('/users', usersRoutes); 

// Middleware de manejo de errores global
app.use(errorMiddleware);

app.listen(PORT, () => {
     console.log(`Servidor escuchando en http://localhost:${PORT}`);
});