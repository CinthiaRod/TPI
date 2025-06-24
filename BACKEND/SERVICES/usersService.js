const userModel = require('../MODELS/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserService {
    async registerUser(username, password, role) {
        const existingUser = userModel.findByUsername(username);
        if (existingUser) {
            throw new Error('El nombre de usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña 
        const newUser = { username, password: hashedPassword, role: role};
        return userModel.create(newUser);
    }

    async loginUser(username, password) {
        const user = userModel.findByUsername(username);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        // Generar token de autenticación 
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET, // Secreto del token en .env 
            { expiresIn: '1h' } // Token expira en 1 hora
        );
        return { token, user: { id: user.id, username: user.username } };
    }

    async getUsers(){
        return userModel.getUsers();
    }
}

module.exports = new UserService();