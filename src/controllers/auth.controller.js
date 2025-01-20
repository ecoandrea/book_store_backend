
import { Usuario } from '../models/Usuario.model.js';
import { loginService } from '../services/auth/login.service.js';
import { registerService } from '../services/auth/register.service.js';





export const register = async(req, res, next) => {
    try {
        const user = await registerService(req.body, Usuario); //info llega del res.body

        res.status(201).json({
            message: 'Usuario registrado con éxito',
            status: 201,
            data: user //Solo fines pedagogicos, no se debe mostrar todos los datos
        });
    } catch (error) {
        next(error);
    }
};

//todo lo que requiera uso de password puede sacarse de aqui

export const login = async(req, res, next) => {
    try {
        const { user, token } = await loginService(req.body);

        res.status(202).json({
            message: 'Usuario autetnicado con éxito',
            status: 202,
            data: { user, token }
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

