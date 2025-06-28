const fs = require('fs'); // Importa el módulo 'fs' para manejar archivos
const path = require('path'); // Importa el módulo 'path' para manejar rutas de archivos

const USER_DATA_FILE = path.join(__dirname, '../DATABASE/users.json'); // Define la ruta del archivo de datos de usuarios

class UserModel { // Clase UserModel para manejar la lógica de negocio relacionada con los usuarios
    constructor() { // Constructor que inicializa la lista de usuarios
        this.users = this.loadUsers();
    }

    loadUsers() { // Carga los usuarios desde el archivo JSON
        // Si el archivo no existe o hay un error al leerlo, devuelve un array vacío
        try { 
            const data = fs.readFileSync(USER_DATA_FILE, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading users data:', error);
            return [];
        }
    }

    saveUsers() { // Guarda los usuarios en el archivo JSON
        // Convierte el array de usuarios a formato JSON y lo escribe en el archivo
        try {
            fs.writeFileSync(USER_DATA_FILE, JSON.stringify(this.users, null, 2), 'utf8');
        } catch (error) {
            console.error('Error saving users data:', error);
        }
    }

    findByUsername(username) { // Busca un usuario por su nombre de usuario
        // Convierte el nombre de usuario a minúsculas 
        return this.users.find(user => user.username.toLowerCase() === username.toLowerCase());
    }


    

    create(newUser) { // Crea un nuevo usuario
        newUser.id = parseInt(Date.now().toString()); // Asigna un ID único basado en la fecha y hora actual

        this.users.push(newUser); // Agrega el nuevo usuario al array de usuarios
        this.saveUsers(); // Guarda los usuarios actualizados en el archivo JSON
        return newUser; // Retorna el nuevo usuario creado
    }

    getUsers() { // Devuelve todos los usuarios
        // Esta función no recibe parámetros y simplemente retorna el array de usuarios cargado
        return this.users;
    }
}

module.exports = new UserModel(); // Exporta una instancia de UserModel para que pueda ser utilizada en otros módulos