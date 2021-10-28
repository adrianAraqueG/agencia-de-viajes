import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const app = express();

// Conectar DB
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch(error => console.log(error));


// Habilitar PUG
app.set('view engine', 'pug');

// Pasar variable año a las vistas
app.use((req, res, next) =>{
    const year = new Date();
    
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
});

// Agregar body parser para leer datos de los forms
app.use(express.urlencoded({extended: true}));

// Agregar Router
app.use('/', router);
app.use('/viajes', express.static('public'));

// Definir caperta publica (archivos estáticos)
app.use(express.static('public'));


// Abrir servidor
    // Definir puerto
    const port = process.env.PORT || 4000;
    // Definir host
    const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () =>{
    console.log('El Servidor está funcionando en el puerto ${port}}');
});