const jwt = require('jsonwebtoken');
require('dotenv').config(); // Cargar variables de entorno

const verifyToken = (req, res, next) => {
    const token = req.headers['autorizacion'];

    if (!token) {
        return res.status(403).json({ message: 'No autorizado' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Formato de token no válido.' });
    }

    const actualToken = tokenParts[1];

    try {
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Error al autenticar el token.', error: error.message });
    }
};

const verifyAdmin = (req, res, next) => {
    const token = req.headers['autorizacion'];

    if (!token) {
        return res.status(403).json({ message: 'No autorizado' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Formato de token no válido.' });
    }

    const actualToken = tokenParts[1];

    try {
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET); 
        req.user = decoded;
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso solo para administradores' });
        } 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Error al autenticar el token.', error: error.message });
    }
};

module.exports = { verifyToken, verifyAdmin };