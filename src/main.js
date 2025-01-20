import express from 'express';
import cors from 'cors';

import { serverInit } from './services/ServerInit.js';

import { fileUploadConfig } from './config/fileUpload.config.js'; 

//rutas
import authRouter from './routes/auth.routes.js';
import libroRouter from './routes/libro.routes.js';


import { errorHandler } from './middlewares/errorHandlers.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(fileUploadConfig); //para archivo

//para que funcione public
app.use(express.static('public'));

//Agregar configuraciones y middlewares para rutas
app.use('/api/v1', authRouter);
app.use('/api/v1', libroRouter);

app.use(errorHandler);

serverInit(app);


//para que funcione carpeta public, se debe dejar una carpeta  estatica, bajo json , arriba rutas
//nunca hacerlo con src quedaria a la vista de todo
//la seguridad de imagen la ve controller , y como no es publico no pueden acceder
//con una carpeta data en controler un usuario podria accede a imagenes porque se le permitiria 