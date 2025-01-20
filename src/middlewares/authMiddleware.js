import jwt from 'jsonwebtoken';
import { AuthError } from '../errors/TypeError.js';
import { config } from '../config/env.config.js';

const { secretKey } = config;

export const authMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization || '';
        const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;

        if(!token) throw new AuthError('Token no proporcionado', 498, 'El token no se encontro, es nulo o tiene un formato inválido');

        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; //Este va a ser útil proximamente
        next();
    } catch (error) {
        throw new AuthError('YOU SHALL NOT PASS!!', 498, error);
    }
};

//mandar auth se manda por cabeeras de la peticion que esta en req.headers
//nombre por cabecera y por front (postman) debe ser el mismo en este caso es authorization
//bearer y va mandar token y se debe hacer sin ''
//starsWith , que comienza con ,  bearer debe ir con un espacio, al contar la palabra mas el espacio da 7
//se decodifica con decoded
//verify pide token y secretKey como parametro