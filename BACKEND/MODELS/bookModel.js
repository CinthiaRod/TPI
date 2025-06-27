const { log } = require('console'); // Importa el módulo 'console'
const fs = require('fs'); // Importa el módulo 'fs' para manejar archivos
const path = require('path'); // Importa el módulo 'path' para manejar rutas de archivos

const DATA_FILE = path.join(__dirname, '../DATABASE/books.json'); // Define la ruta del archivo de datos
class BookModel {// Clase BookModel para manejar la lógica de negocio relacionada con los libros
    // Esta clase se encarga de cargar, guardar, buscar, crear, actualizar y eliminar
    // libros en un archivo JSON que actúa como base de datos.
    constructor() { 
        this.books = this.loadBooks();
    }

    loadBooks() {// Carga los libros desde el archivo JSON
        // Si el archivo no existe o hay un error al leerlo, devuelve un array vacío
        try {
            const data = fs.readFileSync(DATA_FILE, 'utf8');// Lee el archivo de datos en formato UTF-8
            return JSON.parse(data);// Parsea el contenido del archivo JSON y lo convierte en un array de objetos
        } catch (error) { // Maneja cualquier error que ocurra al leer o parsear el archivo
            console.error('Error loading books data:', error);// Imprime un mensaje de error en la consola
            // Si hay un error, devuelve un array vacío para evitar que la aplicación se rompa
            return []; 
        }
    }

    saveBooks() { // Guarda los libros en el archivo JSON
        // Convierte el array de libros a formato JSON y lo escribe en el archivo
        // Si hay un error al escribir el archivo, imprime un mensaje de error en la consola
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(this.books, null, 2), 'utf8');
        } catch (error) {
            console.error('Error saving books data:', error);
        }
    }

    findAll() { // Devuelve todos los libros
        // Esta función no recibe parámetros y simplemente retorna el array de libros cargado
        return this.books;
    }

    findById(id) { // Busca un libro por su ID
        return this.books.find(book => book.id === id);
    }

    create(newBook) { // Crea un nuevo libro
        // Asigna un ID único al nuevo libro basado en la hora actual
        newBook.id = Date.now().toString(); 
        this.books.push(newBook);
        this.saveBooks();
        return newBook;
    }

    update(id, updatedBook) { // Actualiza un libro existente por su ID
        // Busca el índice del libro que se quiere actualizar
        const index = this.books.findIndex(book => book.id === id);
        
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...updatedBook, id }; 
            this.saveBooks();
            return this.books[index];
        }
        return null;
    }

    delete(id) { // Elimina un libro por su ID
        // Filtra el array de libros para eliminar el libro con el ID especificado
        const initialLength = this.books.length;
        this.books = this.books.filter(book => book.id !== id);
        this.saveBooks();

        return this.books.length < initialLength
    }
}

module.exports = new BookModel(); // Exporta una instancia de BookModel para su uso en otras partes de la aplicación