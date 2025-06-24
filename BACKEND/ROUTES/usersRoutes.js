const express = require('express');
const router = express.Router();
const userController = require('../CONTROLLERS/usersController');
const authMiddleware = require('../MIDDLEWARES/authMiddleware'); 

// Rutas de autenticación 
router.get('/', authMiddleware.verifyAdmin, userController.getUsers)
router.post('/register', userController.register); // POST /users/register
router.post('/login', userController.login);       // POST /users/login

module.exports = router;