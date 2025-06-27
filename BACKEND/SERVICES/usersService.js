const userModel = require('../MODELS/usersModel'); // Importa el modelo de usuarios
const bcrypt = require('bcryptjs'); // Importa bcryptjs para el hash de contraseñas
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para generar tokens de autenticación
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

class UserService { // Clase UserService para manejar la lógica de negocio relacionada con los usuarios
    async registerUser(username, password, role) { // Registra un nuevo usuario
        // Verifica si el nombre de usuario ya existe
        const existingUser = userModel.findByUsername(username); // Busca un usuario por nombre de usuario
        if (existingUser) {
            throw new Error('El nombre de usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña con bcrypt
        // Crea un nuevo usuario con el nombre de usuario, contraseña hasheada y rol
        // El rol puede ser 'admin' o 'user', dependiendo de la lógica de la aplicación
        if (!role || (role !== 'admin' && role !== 'user')) { // Verifica que el rol sea válido
        const newUser = { username, password: hashedPassword, role: role}; // Crea un nuevo objeto de usuario
        return userModel.create(newUser);
    }

    async loginUser(username, password) { // Inicia sesión de un usuario existente
        // Busca el usuario por nombre de usuario
        const user = userModel.findByUsername(username);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(password, user.password); // Compara la contraseña proporcionada con la contraseña hasheada del usuario
        // Si las contraseñas no coinciden, lanza un error
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        // Si las contraseñas coinciden, genera un token de autenticación
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET, // Usa la clave secreta del entorno para firmar el token
            { expiresIn: '1h' } // El token expirará en 1 hora
        );
        return { token, user: { id: user.id, username: user.username } };
    }

    async getUsers(){ // Devuelve todos los usuarios registrados
        // Esta función no recibe parámetros y simplemente retorna el array de usuarios cargado
        // desde el modelo de usuarios.
        return userModel.getUsers();
    }
}

module.exports = new UserService(); // Exporta una instancia de UserService para que pueda ser utilizada en otros módulos