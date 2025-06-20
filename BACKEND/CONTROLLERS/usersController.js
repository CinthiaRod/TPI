const userService = require('../SERVICES/usersService');

class UserController {
    async register(req, res, next) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña' });
            }

            const newUser = await userService.registerUser(username, password);
            res.status(201).json({ message: 'Usuario registrado exitosamente', user: { id: newUser.id, username: newUser.username } });
        } catch (error) {
            next(error); // Pasa el error al middleware de manejo de errores
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña' });
            }

            const { token, user } = await userService.loginUser(username, password);
            res.status(200).json({ message: 'Inicio de sesión exitoso', token, user }); // Devuelve el token 
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();