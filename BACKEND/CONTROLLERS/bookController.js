const bookService = require('../SERVICES/bookService');

class BookController {
    async getAllBooks(req, res, next) {
        try {
            const books = bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            next(error); // Pasa el error al middleware de manejo de errores
        }
    }

    async getBookById(req, res, next) {
        try {
            const { id } = req.params;
            const book = bookService.getBookById(id);
            if (!book) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    async createBook(req, res, next) {
        try {
            const newBook = req.body;
            const createdBook = bookService.addBook(newBook);
            res.status(201).json(createdBook);
        } catch (error) {
            next(error);
        }
    }

    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedBook = bookService.updateBook(id, updatedData);
            if (!updatedBook) {
                return res.status(404).json({ message: 'Libro no encontrado para actualizar' });
            }
            res.status(200).json(updatedBook);
        } catch (error) {
            next(error);
        }
    }

    async deleteBook(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = bookService.deleteBook(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Libro no encontrado para eliminar' });
            }
            res.status(204).send(); 
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();