const bookModel = require('../models/bookModel');

class BookService {
    async getAllBooks() {
        return bookModel.findAll();
    }

    async getBookById(id) {
        return bookModel.findById(id);
    }

    async addBook(bookData) {
        return bookModel.create(bookData);
    }

    async updateBook(id, bookData) {
        return bookModel.update(id, bookData);
    }

    async deleteBook(id) {
        return bookModel.delete(id);
    }
}

module.exports = new BookService();