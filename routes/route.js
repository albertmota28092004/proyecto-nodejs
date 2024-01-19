const express = require('express')
const router = express.Router()
const path = require('path');
const bodyParser = require('body-parser');
const modelopersona = require('../models/persona.model');
const mongoose = require("../config/database");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fs = require('fs');

router.use(cookieParser());
router.use(session({
    secret: 'tu_secreto',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // El tiempo de vida de la cookie en milisegundos
}));


router.get('/', (req, res) => {
    let titulo = '+Cotitas - Index';
    res.render('inicio', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});

router.get('/iniciarSesion', (req, res) => {
    let titulo = '+Cotitas - Iniciar Sesión';
    res.render('iniciarSesion', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});

router.get('/citas', (req, res) => {
    let titulo = '+Cotitas - Agendar Cita';
    res.render('citas', {
        "titulo": titulo,
        "session": req.session.usuario
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
        "titulo": titulo,
        "session": req.session.usuario
    });
});
router.get('/servicios', (req, res) => {
    let titulo = '+Cotitas - Servicios';
    res.render('servicios', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});
router.get('/nuestroequipo', (req, res) => {
    let titulo = '+Cotitas - Nuestro equipo';
    res.render('nuestroequipo', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});
router.get('/patrocinios', (req, res) => {
    let titulo = '+Cotitas - Patrocinios';
    res.render('patrocinios', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});
router.get('/historia', (req, res) => {
    let titulo = '+Cotitas - Historia';
    res.render('historia', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});
router.get('/contactanos', (req, res) => {
    let titulo = '+Cotitas - Contáctanos';
    res.render('contactanos', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});

router.get('/catalogo', (req, res) => {
    let titulo = '+Cotitas - Catálogo';
    res.render('catalogo', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});
-
    router.get('/inicio_admin', (req, res) => {
        let titulo = '+Cotitas - Inicio';
        res.render('inicio_admin', {
            "titulo": titulo,
        "session": req.session.usuario
        });
    });

router.get('/agregarimagen', (req, res) => {
    let titulo = '+Cotitas - Agregar imagen';
    res.render('agregarimagen', {
        "titulo": titulo,
        "session": req.session.usuario
    });
});

router.get('/listado_productos', (req, res) => {
    let titulo = '+Cotitas - Lista de productos';
    if (req.session.usuario) {
        res.render('listado_productos', {
            "titulo": titulo,
        "session": req.session.usuario
        });
    }
    else {
        res.send('<h1>No tienes permiso para acceder a este sitio. Regístrate</h1>');
    }
});

router.get('/landing', (req, res) => {

    fetch('https://fakestoreapi.com/products?limit=3')
        .then(res => res.json())
        .then(json => {
            let productos = json
            res.render('landing', {
                mascomprados: productos,
                "session": req.session.usuario
            })
        })

});

/*--------------------------Ingreso de datos---------------------------*/

router.post('/newPersona', upload.single('imagenRegistro'), async (req, res) => {
    console.log(req.body);

    let imagenPorDefectoBuffer;

    // Lee el contenido de la imagen por defecto desde el sistema de archivos
    try {
        const imagePath = path.join(__dirname, '../static/img/imagen_base_usuario.webp');
        imagenPorDefectoBuffer = fs.readFileSync(imagePath);
    } catch (error) {
        console.error('Error al leer la imagen por defecto', error);
        return res.status(500).send('Error interno del servidor');
    }

    let aprendiz = new modelopersona({
        email: req.body.correoRegistro,
        nombre: req.body.nombreRegistro,
        documento: req.body.documentoRegistro,
        telefono: req.body.telefonoRegistro,
        usuario: req.body.usuarioRegistro,
        contrasena: req.body.contrasenaRegistro,
        imagen: req.file ? req.file.buffer : imagenPorDefectoBuffer
    });
    await aprendiz.save()
        .then(doc => {
            console.log(doc)
            req.session.usuario = doc.usuario;
            res.redirect('/agregarimagen');
        })
        .catch(err => {
            console.error(err)
            res.send('<h2>Error</h2>')
            res.end();
        })

})

router.post('/iniciarSesion', async (req, res) => {
    const { usuarioInicio, contrasenaInicio } = req.body;

    try {
        const persona = await modelopersona.findOne({ usuario: usuarioInicio, contrasena: contrasenaInicio });

        if (persona) {
            req.session.usuario = persona.usuario;
            res.redirect('/');
        } else {
            // Credenciales incorrectas
            res.send('<h2>Credenciales incorrectas</h2>');
        }
    } catch (error) {
        console.error(error);
        res.send('<h2>Error en el servidor</h2>');
    }
});


router.get('/listarPersonas', async (req, res) => {
    modelopersona
        .find({})
        .then(doc => {
            console.log(doc);
            res.render('listarPersonas', {
                personasListadas: doc
            })
        })
        .catch(err => {
            console.error(err)
            res.send('<h2>Error</h2>')
            res.end();
        })
});

router.get('/cerrarSesion', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/');
        }
    });
});

// Ruta para obtener la imagen por ID
router.get('/api/obtener-imagen/:usuario', async (req, res) => {
    try {
        // Busca el registro en la base de datos por ID
        const persona = await modelopersona.findById(req.params.usuario);

        if (!persona) {
            return res.status(404).send('Imagen no encontrada');
        }

        // Decodifica la imagen desde base64
        const imagenBase64 = persona.imagen.buffer.toString('base64');
        const imagenBinaria = Buffer.from(imagenBase64, 'base64');

        // Envia la imagen como respuesta
        res.set('Content-Type', 'image/png'); // Ajusta el tipo de contenido según el formato de tu imagen
        res.send(imagenBinaria);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});







module.exports = router