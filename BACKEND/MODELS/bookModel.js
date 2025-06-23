const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../DATABASE/books.json'); 
class BookModel {
    constructor() {
        this.books = this.loadBooks();
    }

    loadBooks() {
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading books data:', error);
            return []; 
        }
    }

    saveBooks() {
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(this.books, null, 2), 'utf8');
        } catch (error) {
            console.error('Error saving books data:', error);
        }
    }

    findAll() {
        return this.books;
    }

    findById(id) {
        return this.books.find(book => book.id === id);
    }

    create(newBook) {
        newBook.id = Date.now().toString(); 
        this.books.push(newBook);
        this.saveBooks();
        return newBook;
    }

    update(id, updatedBook) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...updatedBook, id }; 
            this.saveBooks();
            return this.books[index];
        }
        return null;
    }

    delete(id) {
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.id !== id);
        this.saveBooks();
        return this.books.length < initialLength; 
    }
}

module.exports = new BookModel();