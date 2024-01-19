const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false})); 
app.use(express.json())
app.use(logger('dev'));

app.use(cookieParser());
app.use(session({
    secret: 'tu_secreto',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // El tiempo de vida de la cookie en milisegundos
}));

const postRoute = require('./routes/route');

//app.use('/inicio', postRoute);

app.set('view engine', 'ejs');

// Archivos estáticos
app.use(express.static('static'));

// Conectar las páginas
app.set('views', path.join(__dirname, './views/pages'));

// Conectar el archivo de rutas
app.use('', require('./routes/route'))

// Establecer el puerto donde se ejecutará 
app.listen(9100, () => {
    console.log("Se está escuchando en el puerto 9100");
});


