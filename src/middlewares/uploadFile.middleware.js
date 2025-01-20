import path from 'path'; // modulo de node que configura rutas
import { v4 as uuidv4 } from 'uuid'; // se usa uuid porque podrian repetirse nombres o malos nombres, podria afectar el SEO
import { fileURLToPath } from 'url';
import { UploadFileError } from '../errors/TypeError.js';
import { config } from '../config/env.config.js';

const __filename = fileURLToPath(import.meta.url); //url donde esta ubicado proyecto
const __dirname = path.dirname(__filename); //nombre del directorio donde esta ubicado proyecto y lo almaceno n una ruta
const { domain } = config;


export const uploadFileMiddleware = (folderName, fileKey = 'files', /* type */) => { //esta func no puede ser una promesa, pero callback de router no puede ser promesa por riesgo a quedarse  pegada
    //folderName para que sea dinamico, seria como la ruta donde se va a guardar 
    //fileKey para que sea dinamico, nombre, clave, propiedad dentro de objeto, donde estara alojado archivo en la peticion 
    return(req, res, next) => {
        try {
            if(!req.files || !req.files[fileKey]) {
                return next();
            }
            const file = req.files[fileKey]; //se saca de prof file
    
            const extension = path.extname(file.name);
            //isValidExtension(extension, type);
            //validTypesFiles[type].includes(extension)
            const safeName = req.body.nombre.replace(/\s+/g, '-'); //saca los espacios
    
            const uniqueNameFile = `${uuidv4()}-${safeName}${extension}`; //nombre del archivo
            //C:/djkjfdkdfjfjd/book_store_back/public/uploads/images/books/uuid-nombreLibro.ext
            const uploadPath = path.join(__dirname, `../../public/uploads/${folderName}`, uniqueNameFile); //nombre de ruta que se guarda en fisico
    
            file.mv(uploadPath, (err) => {  //mv es de mover
                if(err) {
                    console.error('Error Subiendo archivo', err);
                    throw new UploadFileError('Error al intentar subir el archivo', 500, err);
                }
                
                req.uploadedFilePath = `${domain}/uploads/${folderName}/${uniqueNameFile}`; //esto es la petición , la ruta que queda disponible para la consulta
                //queda el domain que esta en variables de entorno
                next();
            });
            
        } catch (error) {
            console.error(error);
            throw new UploadFileError('Error al subir el archivo', 500, error);
        }
    };
}; 

//path configura rutas, se debe indicar que cree en public y debe poder llegar a esa ruta

//middleware esta entre req y la res
//peticion se convierte en objeto y tiene propiedades archivo se guarda en res.file 
//filesKey = file  es como key:value
//encuentra el nombre donde esta alojado el archivo 
//lo hace dinamico asi que es mas escalable

//cuando hay un archivo estatico  , la carpeta no se nombra  queda disponible para el servidor, si la busca no la encontraria