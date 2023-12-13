const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false})); 
app.use(express.json())
app.use(logger('dev'));

const postRoute = require('./routes/route');

//app.use('/inicio', postRoute);

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.set('views', path.join(__dirname, './views/pages'));

app.use('', require('./routes/route'))

app.listen(9100, () => {
    console.log("Se está escuchando en el puerto 9100");
});


