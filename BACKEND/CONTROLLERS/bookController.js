//Importamos modulos
const bookService = require('../SERVICES/bookService');

//Creamos clase
class BookController {
    //Funcion para obtener todos los libros de la base de datos
    async getAllBooks(req, res, next) {
        try {
            //constante "books" que nos arroja todos los libros, segun la logica desarrollada en "bookService"
            const books = bookService.getAllBooks();
            //Si la solicitud fue exitosa, arrojar codigo de estado 200 y mostrar todos los libros
            res.status(200).json(books);
        } catch (error) { //Si sucede un error...
            next(error); // Pasa el error al middleware de manejo de errores
        }
    }

    //Funcion para obtener libros segun su ID
    async getBookById(req, res, next) {
        try {
            //Obtener ID segun la informacion provista por el usuario
            const { id } = req.params;
            //Buscar el libro con su ID utilizando la funcion desarrollada en "bbokService"
            const book = bookService.getBookById(parseInt(id));
            //Si no se encuentra el libro
            if (!book) {
                //Enviar mensaje de estado al usuario de que el libro no fue encontrado
                return res.status(404).json({ message: 'Book not found' });
            }
            //Si la solicitud fue exitosa, mostrar la informacion del libro
            res.status(200).json(book);
        } catch (error) {//Si existe un error, mostrar el error
            next(error);
        }
    }

    //Funcion para crear un libro
    async createBook(req, res, next) {
        try {
            //Obtener informacion del libro provista por el usuario
            const newBook = req.body;
            //Crear nuevo libro con base en funcionde "bookService"
            const createdBook = bookService.addBook(newBook);
            //Si la solicitud es exitosa, mandar informacion del libro creado
            res.status(201).json(createdBook);
        } catch (error) {//En caso de error, mostrarlo
            next(error);
        }
    }

    //Funcion para actualizar libro
    async updateBook(req, res, next) {
        try {
            //Obtener informacion por parte del usuario
            const { id } = req.params;
            const updatedData = req.body;
            //Actualizar libro con funcion de "bookService"
            const updatedBook = bookService.updateBook(parseInt(id), updatedData);

            //Si no se encuentra el libro...
            if (!updatedBook) {
                //Mandar aviso de que no pudo ser actualiado
                return res.status(404).json({ message: 'Update failed: book not found' });
            }
            //Si la solicitu es exitosa, mostrar libro actualizado
            res.status(200).json(updatedBook);

        } catch (error) {//En caso de error, mostrarlo
            next(error);
        }
    }

    //Funcion para borrar libro
    async deleteBook(req, res, next) {
        try {
            //Obtener ID del usuario
            const { id } = req.params;
            //Eliminarlo con base en la funcion "bookService"
            const deleted = bookService.deleteBook(parseInt(id));

            //Si el libro a eliminar no fue encontrado
            if (!deleted) {
                //Mandar mensaje del problema
                return res.status(404).json({ message: 'Delete failed: book not found' });
            }
            //Si la solicitud fue exitosa, mostrar mensaje de ello
            return res.status(200).json({ message: "Book deleted successfully."}); 

        } catch (error) {//En caso de algun otro error, mostrarlo
            next(error);
        }
    }
}


//Exportar modulo
module.exports = new BookController();