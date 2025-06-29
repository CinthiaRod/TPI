const userModel = require('../MODELS/usersModel'); // Importa el modelo de usuarios
const bcrypt = require('bcryptjs'); // Importa bcryptjs para el hash de contraseñas
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para generar tokens de autenticación
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

class UserService { // Clase UserService para manejar la lógica de negocio relacionada con los usuarios
    /**
     * Registra un nuevo usuario en el sistema.
     * Hashea la contraseña y valida el rol del usuario.
     * @param {string} username - Nombre de usuario.
     * @param {string} password - Contraseña del usuario.
     * @param {string} role - Rol del usuario ('admin' o 'user').
     * @returns {object} El nuevo objeto de usuario creado.
     * @throws {Error} Si el nombre de usuario ya existe o el rol no es válido.
     */
    async registerUser(username, password, role) {
        // 1. Verifica si el nombre de usuario ya existe
        const existingUser = userModel.findByUsername(username);
        if (existingUser) {
            console.error(`Intento de registro fallido: El nombre de usuario '${username}' ya existe.`);
            const error = new Error('El nombre de usuario ya existe');
            error.statusCode = 400;
            throw error;
        }

        // 2. Valida que el rol sea uno de los permitidos ('admin' o 'user')
        if (role !== 'admin' && role !== 'user') {
            console.error(`Intento de registro fallido: Rol no válido '${role}' para el usuario '${username}'.`);
            // Se podría optar por asignar un rol predeterminado como 'user' en lugar de lanzar un error.
            const error = new Error('Rol de usuario no válido. Debe ser "admin" o "user".');
            error.statusCode = 400;
            throw error;
        }

        // 3. Hashea la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Contraseña hasheada para '${username}'.`);

        // 4. Crea el nuevo objeto de usuario con la contraseña hasheada y el rol validado
        const newUser = { username, password: hashedPassword, role: role };
        
        // 5. Guarda el nuevo usuario usando el modelo
        const createdUser = userModel.create(newUser);
        console.log(`Usuario '${username}' registrado exitosamente con rol '${role}'.`);
        return createdUser;
    }

    /**
     * Inicia sesión de un usuario existente.
     * Compara la contraseña y genera un token JWT.
     * @param {string} username - Nombre de usuario.
     * @param {string} password - Contraseña del usuario.
     * @returns {object} Un objeto que contiene el token JWT y los datos simplificados del usuario.
     * @throws {Error} Si las credenciales son inválidas o los datos del usuario están incompletos.
     */
    async loginUser(username, password) {
        // 1. Busca el usuario por su nombre de usuario en el modelo
        const user = userModel.findByUsername(username);

        // 2. Si el usuario NO existe, lanza un error de credenciales inválidas.
        if (!user) {
            console.log(`Intento de inicio de sesión fallido para '${username}': Usuario no encontrado.`);
            
            const error = new Error('Credenciales inválidas. Usuario no encontrado');
            error.statusCode = 401;
            throw error;
        }

        // 3. Compara la contraseña proporcionada con la contraseña hasheada almacenada
        const isMatch = await bcrypt.compare(password, user.password);

        // 4. Si las contraseñas NO coinciden, lanza un error.
        if (!isMatch) {
            console.log(`Intento de inicio de sesión fallido para '${username}': Contraseña incorrecta.`);
            
            const error = new Error('Credenciales inválidas. Contraseña incorrecta');
            error.statusCode = 401;
            throw error;
        }

        // 5. **Verificación defensiva:** Asegúrate de que el objeto 'user' tiene las propiedades necesarias para el token.
        //    Esto es crucial para evitar el error "Cannot read properties of undefined (reading 'id')"
        //    si, por alguna razón, el 'user' recuperado del JSON no tiene 'id' o 'role'.
        if (!user.id || !user.username || !user.role) {
            console.error("Error crítico: El objeto de usuario recuperado del modelo está incompleto.", user);
            const error = new Error("Datos de usuario incompletos. Por favor, contacte al administrador.");
            error.statusCode = 400;
            throw error;
        }

        console.log(`Usuario '${user.username}' autenticado exitosamente. Generando token...`);

        // 6. Genera un token de autenticación JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role }, // Payload del token con ID, username y rol
            process.env.JWT_SECRET, // Usa la clave secreta definida en tus variables de entorno
            { expiresIn: '1h' } // El token expirará en 1 hora
        );
        console.log(`Token generado para '${user.username}'.`);

        // 7. Devuelve el token y una versión simplificada del objeto de usuario (incluyendo el rol)
        return { token, user: { id: user.id, username: user.username, role: user.role } };
    }

    /**
     * Devuelve todos los usuarios registrados en el sistema.
     * @returns {Array<object>} Un array de objetos de usuario.
     */
    async getUsers() {
        console.log('Solicitando todos los usuarios.');
        // Esta función simplemente retorna el array de usuarios cargado desde el modelo.
        return userModel.getUsers();
    }
}

module.exports = new UserService(); // Exporta una instancia de UserService para que pueda ser utilizada en otros módulos