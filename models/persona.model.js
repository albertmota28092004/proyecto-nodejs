const mongoose = require("../config/database");
const Persona = new mongoose.Schema({
  email: {  
    type: String,
    unique: [true, 'Debe registrar email'] 
  },
  nombre: {
    type: String,
    required: true,
    minLength: [3, 'Nombre muy corto'],
    maxLength: [30, 'Nombre muy largo']
  },
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  }

});

const modelopersona = mongoose.model("persona", Persona);
module.exports = modelopersona;