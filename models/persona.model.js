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
  documento: {
    type: Number,
    required: true,
    minLength: [7, 'Documento muy corto'],
    maxLength: [15, 'Documento muy largo']
  },
  telefono: {
    type: Number,
    required: true,
    minLength: [7, 'Teléfono muy corto'],
    maxLength: [12, 'Teléfono muy largo']
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