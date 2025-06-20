const bookModel = require('../models/bookModel');

class BookService {
    getAllBooks() {
        return bookModel.findAll();
    }

    getBookById(id) {
        return bookModel.findById(id);
    }

    addBook(bookData) {
        // Aquí podrías añadir lógica de negocio adicional antes de crear el libro
        // Por ejemplo, validar ISBN, verificar stock inicial, etc.
        return bookModel.create(bookData);
    }

    updateBook(id, bookData) {
        // Lógica de negocio antes de actualizar
        return bookModel.update(id, bookData);
    }

    deleteBook(id) {
        // Lógica de negocio antes de eliminar
        return bookModel.delete(id);
    }
}

module.exports = new BookService();