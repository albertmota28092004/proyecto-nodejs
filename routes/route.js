const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

router.get('/listardepartamentos', (req, res) => {
    res.render('listardepartamentos');
})

router.get('/', (req, res) => {
    let titulo = '+Cotitas - Index';
    res.render('inicio', {
        "titulo": titulo
    });
});

router.get('/iniciarSesion', (req, res) => {
    let titulo = '+Cotitas - Iniciar Sesión';
    res.render('iniciarSesion', {
        "titulo": titulo
    }); // Renderiza la plantilla 'iniciarSesion.ejs'
});

router.get('/citas', (req, res) => {
    let titulo = '+Cotitas - Agendar Cita';
    res.render('citas', {
        "titulo": titulo
    });
});

router.get('/alimento', (req, res) => {
    let titulo = '+Cotitas - Productos de Alimento';
    res.render('alimento', {
        "titulo": titulo
    });
});

router.get('/delimpieza', (req, res) => {
    let titulo = '+Cotitas - Productos de Limpieza';
    res.render('delimpieza', {
        "titulo": titulo
    });
});
router.get('/servicios', (req, res) => {
    let titulo = '+Cotitas - Servicios';
    res.render('servicios', {
        "titulo": titulo
    });
});
router.get('/nuestroequipo', (req, res) => {
    let titulo = '+Cotitas - Nuestro equipo';
    res.render('nuestroequipo', {
        "titulo": titulo
    });
});
router.get('/patrocinios', (req, res) => {
    let titulo = '+Cotitas - Patrocinios';
    res.render('patrocinios', {
        "titulo": titulo
    });
});
router.get('/historia', (req, res) => {
    let titulo = '+Cotitas - Historia';
    res.render('historia', {
        "titulo": titulo
    });
});
router.get('/contactanos', (req, res) => {
    let titulo = '+Cotitas - Contáctanos';
    res.render('contactanos', {
        "titulo": titulo
    });
});

router.get('/catalogo', (req, res) => {
    let titulo = '+Cotitas - Catálogo';
    res.render('catalogo', {
        "titulo": titulo
    });
});
-
router.get('/inicio_admin', (req, res) => {
    let titulo = '+Cotitas - Inicio';
    res.render('inicio_admin', {
        "titulo": titulo
    });
});

router.get('/listado_productos', (req, res) => {
    let titulo = '+Cotitas - Lista de productos';
    res.render('listado_productos', {
        "titulo": titulo
    });
});

router.get('/landing', (req, res) => {
    
    fetch('https://fakestoreapi.com/products?limit=3')
    .then(res => res.json())
    .then(json => {
        let productos=json
        res.render('landing', {
            mascomprados : productos
        })
    })
   
});

mongoose.connect('mongodb+srv://albertmota28:5Y6Nhirv9eeQ7jlZ@clusteradso2557466.htke3tm.mongodb.net/')

module.exports = router