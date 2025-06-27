const express = require('express'); // Importa el módulo 'express' para crear el enrutador
// Este módulo permite manejar las rutas y solicitudes HTTP en la aplicación.
const router = express.Router(); // Crea un nuevo enrutador de Express
// El enrutador se utiliza para definir las rutas de la API y asociarlas con los
const bookController = require('../CONTROLLERS/bookController'); // Importa el controlador de libros
// Este controlador contiene la lógica de negocio para manejar las solicitudes relacionadas con los libros.
const authMiddleware = require('../MIDDLEWARES/authMiddleware');  // Importa el middleware de autenticación
// Este middleware se utiliza para verificar si el usuario está autenticado antes de permitir el acceso a
const userController = require('../CONTROLLERS/usersController'); // las rutas protegidas.


router.get('/', bookController.getAllBooks); // Ruta para obtener todos los libros
router.get('/:id', bookController.getBookById); // Ruta para obtener un libro por su ID

<<<<<<< HEAD
router.post('/', authMiddleware.verifyToken, bookController.createBook);  // Ruta para crear un nuevo libro, protegida por autenticación
// Solo los usuarios autenticados pueden crear un libro.
router.put('/:id', authMiddleware.verifyToken, bookController.updateBook); // Ruta para actualizar un libro por su ID, protegida por autenticación
// Solo los usuarios autenticados pueden actualizar un libro.
router.delete('/:id', authMiddleware.verifyToken, bookController.deleteBook); // Ruta para eliminar un libro por su ID, protegida por autenticación
// Solo los usuarios autenticados pueden eliminar un libro.
=======
router.post('/', authMiddleware.verifyAdmin, bookController.createBook); 
router.put('/:id', authMiddleware.verifyAdmin, bookController.updateBook); 
router.delete('/:id', authMiddleware.verifyAdmin, bookController.deleteBook); 
>>>>>>> 96ebe99f7383eaf797962fe6a320fdc5c51e3e84

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otros módulos
