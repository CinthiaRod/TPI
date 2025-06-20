const express = require('express');
const router = express.Router();
const bookController = require('../CONTROLLERS/bookController');
const authMiddleware = require('../MIDDLEWARES/authMiddleware'); 
const userController = require('../CONTROLLERS/usersController');


router.get('/', bookController.getAllBooks); 
router.get('/:id', bookController.getBookById);

router.post('/', authMiddleware.verifyToken, bookController.createBook); 
router.put('/:id', authMiddleware.verifyToken, bookController.updateBook); 
router.delete('/:id', authMiddleware.verifyToken, bookController.deleteBook); 

module.exports = router;