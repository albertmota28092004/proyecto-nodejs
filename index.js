const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

app.use(bodyParser.json());
app.use(logger('dev'));

const postRoute = require('./routes/post');

//app.use('/inicio', postRoute);

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.set('views', path.join(__dirname, './views/pages'));

app.get('/listardepartamentos', (req, res) => {
    res.render('listardepartamentos');
})

app.get('/', (req, res) => {
    let titulo = '+Cotitas - Index';
    res.render('inicio', {
        "titulo": titulo
    });
});

app.get('/iniciarSesion', (req, res) => {
    let titulo = '+Cotitas - Iniciar Sesión';
    res.render('iniciarSesion', {
        "titulo": titulo
    }); // Renderiza la plantilla 'iniciarSesion.ejs'
});

app.get('/citas', (req, res) => {
    let titulo = '+Cotitas - Agendar Cita';
    res.render('citas', {
        "titulo": titulo
    });
});

app.get('/alimento', (req, res) => {
    let titulo = '+Cotitas - Productos de Alimento';
    res.render('alimento', {
        "titulo": titulo
    });
});

app.get('/delimpieza', (req, res) => {
    let titulo = '+Cotitas - Productos de Limpieza';
    res.render('delimpieza', {
        "titulo": titulo
    });
});
app.get('/servicios', (req, res) => {
    let titulo = '+Cotitas - Servicios';
    res.render('servicios', {
        "titulo": titulo
    });
});
app.get('/nuestroequipo', (req, res) => {
    let titulo = '+Cotitas - Nuestro equipo';
    res.render('nuestroequipo', {
        "titulo": titulo
    });
});
app.get('/patrocinios', (req, res) => {
    let titulo = '+Cotitas - Patrocinios';
    res.render('patrocinios', {
        "titulo": titulo
    });
});
app.get('/historia', (req, res) => {
    let titulo = '+Cotitas - Historia';
    res.render('historia', {
        "titulo": titulo
    });
});
app.get('/contactanos', (req, res) => {
    let titulo = '+Cotitas - Contáctanos';
    res.render('contactanos', {
        "titulo": titulo
    });
});

app.get('/catalogo', (req, res) => {
    let titulo = '+Cotitas - Catálogo';
    res.render('catalogo', {
        "titulo": titulo
    });
});
-
app.get('/inicio_admin', (req, res) => {
    let titulo = '+Cotitas - Inicio';
    res.render('inicio_admin', {
        "titulo": titulo
    });
});

app.listen(9100, () => {
    console.log("Se está escuchando en el puerto 9100");
});

/*mongoose.connect('mongodb+srv://albertmota28:5Y6Nhirv9eeQ7jlZ@clusteradso2557466.htke3tm.mongodb.net/', { useNewUrlParser: true }, () => {
    console.log('Sí hay conexión a la DB');
});*/
