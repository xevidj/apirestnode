const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//users
const ContenidoSchema = new Schema({
  userid: {
    type: String,    
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  imgUrl: {
    type: String,
    default: "default"
  }
});

module.exports = Item = mongoose.model('contenido', ContenidoSchema);
