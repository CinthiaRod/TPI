const bookModel = require('../models/bookModel');

class BookService {
    getAllBooks() {
        return bookModel.findAll();
    }

    getBookById(id) {
        return bookModel.findById(id);
    }

    addBook(bookData) {
        return bookModel.create(bookData);
    }

    updateBook(id, bookData) {
        return bookModel.update(id, bookData);
    }

    deleteBook(id) {
        return bookModel.delete(id);
    }
}

module.exports = new BookService();