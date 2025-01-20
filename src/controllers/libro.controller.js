import { Libro } from '../models/Libro.model.js';

export const createBook = async(req, res, next) => {
    try {
        const { nombre, autor, editorial, ...resto } = req.body;
        const imagePath = req.uploadedFilePath || null; //saca archivo de imagenes que viene del middleware, || se podria dejar valor por defecto desde una variable

        const bookData = {
            nombre, 
            autor, 
            editorial, 
            image: imagePath, 
            ...resto
        };
        
        const newBook = await Libro.create(bookData);

        res.status(201).json({
            message: 'Libro Creado con éxito',
            status: 201,
            data: newBook
        });
    } catch (error) {
        next(error);
    }
};