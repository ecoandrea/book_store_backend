import { Usuario } from '../models/Usuario.model.js';
import { hashPassword } from '../services/password/hash.services.js';
import { destructuringUserData, normalizeUserData } from '../utils/normalize/user.js';
import { ensureEmailNotTaken } from '../utils/validators/model.js';
import { validatePassword } from '../utils/validators/password.js';

export const register = async(req, res, next) => {
    try {
        const [userGeneralData, email, password] = destructuringUserData(req.body); //en esta sola linea se saca la info que se quiere ordenada, la general , el email y el password

        await ensureEmailNotTaken(Usuario, email);
        validatePassword(password, userGeneralData.fecha_nacimiento);

        const hashedPassword = await hashPassword(password);
        const userData = normalizeUserData(email, hashedPassword, userGeneralData);


        /*
        const userData = {
            ...userGeneralData,
            email,
            password: hashedPassword
            }

        */
        
        

        const user = await Usuario.create(userData);
        
        res.status(201).json({
            message: 'Usuario creado correctamente',
            status: 201,
            data: user //Solo fines pedagogicos, no se debe mostrar todos los datos
        });
    } catch (error) {
        next(error);
    }
};