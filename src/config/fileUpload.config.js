import fileUpload from 'express-fileupload'; //hay que descargar la dependencia

export const fileUploadConfig = fileUpload({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, //10MB, 
    abortOnLimit: true, //si supera limit aborta subida
});

//limit establece tamaño final que se va a soportar de archivo
//img las ve front, backend maneja cosas mas pequeñas
//1024 es un mega . 8bit = 1 byte   1024 = 1kb
