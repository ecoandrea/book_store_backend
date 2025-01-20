import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY || 'defaultSecretKey',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5050',
    domain: process.env.DOMAIN || 'http://localhost:3000', // se usa en uploadFile middleware
    db: {
        name: process.env.DB_NAME || 'database',
        user: process.env.DB_USER || 'user',
        pass: process.env.DB_PASS || 'pass',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || 'postgres'
    }
  
    /*    validTypesFiles: {
        images: ['jpg', 'webp', 'png'],
        videos: ['mp4', 'webm', 'ogg'],
        documents: ['pdf', 'docx', 'doc', 'xls', 'xlsx', 'ppt']
    } */

};

//genero objeto con todas las variables de entorno
//llamado se hace una sola vez y se guarda en memoria de archivo de config, ya no hay que volver a llamarlo, escribirlo .solo  leerlo , ahorrandose eso
//de 3 me ahorro 2
