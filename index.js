const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

app.use(bodyParser.json());
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

/*mongoose.connect('mongodb+srv://albertmota28:5Y6Nhirv9eeQ7jlZ@clusteradso2557466.htke3tm.mongodb.net/', { useNewUrlParser: true }, () => {
    console.log('Sí hay conexión a la DB');
});*/
