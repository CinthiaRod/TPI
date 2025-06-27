const bookModel = require('../models/bookModel');

class BookService { // Clase BookService para manejar la lógica de negocio relacionada con los libros
    // Esta clase se encarga de interactuar con el modelo de libros y proporciona métodos
    // para obtener, crear, actualizar y eliminar libros.
    getAllBooks() { // Devuelve todos los libros
        return bookModel.findAll();
    }

    getBookById(id) { // Busca un libro por su ID
        return bookModel.findById(id);
    }

    addBook(bookData) { // Crea un nuevo libro
        return bookModel.create(bookData);
    }

    updateBook(id, bookData) { // Actualiza un libro existente por su ID
        return bookModel.update(id, bookData);
    }

    deleteBook(id) { // Elimina un libro por su ID
        // Elimina un libro del modelo de libros y devuelve el resultado de la operación
        return bookModel.delete(id);
    }
}

module.exports = new BookService(); // Exporta una instancia de BookService para que pueda ser utilizada en otros módulos