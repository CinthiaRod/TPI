const express = require('express');
const router = express.Router();
const userController = require('../CONTROLLERS/usersController');

// Rutas de autenticación 
router.post('/register', userController.register); // POST /users/register
router.post('/login', userController.login);       // POST /users/login

module.exports = router;