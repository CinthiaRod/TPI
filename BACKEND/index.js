//Importar modulos
const express = require('express');
const dotenv = require('dotenv');
const bookRoutes = require('./ROUTES/bookRoutes');
const usersRoutes = require ('./ROUTES/usersRoutes')
const errorMiddleware = require('./MIDDLEWARES/ErrorMiddleware');

// Cargar variables de entorno desde .env 
dotenv.config(); 

//Crear app con express
const app = express();
//Puerto configurable, segun lo indicado en archivo ".env"
const PORT = process.env.PORT || 3000; // En caso de que falte la información, por defecto sera "3000"

// Middleware para parsear archivo JSON
//Es decir, interpretar automáticamente el cuerpo de las solicitudes entrantes en formato JSON.
app.use(express.json()); 
//Middleware para obtener la información del front
app.use(express.static('PUBLIC'));

// Rutas de la API
app.use('/books', bookRoutes); //para las consultas de los libros
app.use('/users', usersRoutes); //para las consultas de los usuarios

// Middleware de manejo de errores global
app.use(errorMiddleware);

//Iniciar el servidor y hacer que escuche en un puerto especifico
app.listen(PORT, () => {
     console.log(`Server listen at http://localhost:${PORT}`);
});