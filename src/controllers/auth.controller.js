
import { Usuario } from '../models/Usuario.model.js';
import { registerService } from '../services/auth/registerService.js';

export const register = async(req, res, next) => {
    try {
        const user = await registerService(req.body, Usuario);

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
    
};