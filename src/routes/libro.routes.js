import { Router } from 'express';
import { uploadFileMiddleware } from '../middlewares/uploadFile.middleware.js';
import { createBook } from '../controllers/libro.controller.js';


const router = Router();

router.post('/libro', uploadFileMiddleware('image/book', 'image'),  createBook); 

//middleware recibe parametros , 1ero ruta carpeta, 2do es lo que va en postman (form-data)

export default router;