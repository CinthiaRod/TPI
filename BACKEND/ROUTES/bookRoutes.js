const express = require('express');
const router = express.Router();
const bookController = require('../CONTROLLERS/bookController');
const authMiddleware = require('../MIDDLEWARES/authMiddleware'); 
const userController = require('../CONTROLLERS/usersController');


router.get('/', bookController.getAllBooks); 
router.get('/:id', bookController.getBookById);

router.post('/', authMiddleware.verifyAdmin, bookController.createBook); 
router.put('/:id', authMiddleware.verifyAdmin, bookController.updateBook); 
router.delete('/:id', authMiddleware.verifyAdmin, bookController.deleteBook); 

module.exports = router;