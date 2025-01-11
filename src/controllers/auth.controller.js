import { Usuario } from '../models/Usuario.model.js';
import { destructuringUserData } from '../utils/normalize/user.js';
import { ensureEmailNotTaken } from '../utils/validators/model.js';

export const register = async(req, res, next) => {
    try {
        const [userGeneralData, email, password] = destructuringUserData(req.body); //en esta sola linea se saca la info que se quiere ordenada, la general , el email y el password

        await ensureEmailNotTaken(Usuario, email);

        
    } catch (error) {
        
    }
};